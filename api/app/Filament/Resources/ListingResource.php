<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ListingResource\Pages;
use App\Filament\Resources\ListingResource\RelationManagers\MembershipsRelationManager;
use App\Models\Listing;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ListingResource extends Resource
{
    protected static ?string $model = Listing::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Marketplace';

    protected static ?string $navigationLabel = 'Annonces / cercles';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Annonce')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('host_id')
                            ->label('Hôte')
                            ->relationship('host', 'name')
                            ->searchable()
                            ->required(),
                        Forms\Components\Select::make('status')
                            ->options(['active' => 'Active', 'inactive' => 'Inactive'])
                            ->required(),
                        Forms\Components\TextInput::make('service')
                            ->required(),
                        Forms\Components\TextInput::make('plan')
                            ->required(),
                        Forms\Components\TextInput::make('price')
                            ->label('Prix / mois')
                            ->required()
                            ->numeric()
                            ->suffix('FCFA'),
                        Forms\Components\TextInput::make('seats')
                            ->label('Places totales')
                            ->required()
                            ->numeric(),
                        Forms\Components\ColorPicker::make('color'),
                        Forms\Components\Textarea::make('description')
                            ->columnSpanFull(),
                    ]),
                Forms\Components\Section::make('Accès partagé')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('access_type')
                            ->options(['link' => 'Lien d\'invitation', 'credentials' => 'Identifiants'])
                            ->live()
                            ->required(),
                        Forms\Components\Textarea::make('access_link')
                            ->label('Lien d\'invitation')
                            ->visible(fn (Forms\Get $get) => $get('access_type') === 'link'),
                        Forms\Components\TextInput::make('access_email')
                            ->label('Email du compte')
                            ->visible(fn (Forms\Get $get) => $get('access_type') === 'credentials'),
                        Forms\Components\TextInput::make('access_password')
                            ->label('Mot de passe du compte')
                            ->visible(fn (Forms\Get $get) => $get('access_type') === 'credentials'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('service')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('plan')
                    ->searchable(),
                Tables\Columns\TextColumn::make('host.name')
                    ->label('Hôte')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('price')
                    ->numeric()
                    ->sortable()
                    ->suffix(' FCFA'),
                Tables\Columns\TextColumn::make('seats_left')
                    ->label('Occupation')
                    ->state(fn (Listing $record) => ($record->seats - $record->seatsLeft()).'/'.$record->seats.' places'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state) => $state === 'active' ? 'success' : 'gray'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Créée')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(['active' => 'Active', 'inactive' => 'Inactive']),
                Tables\Filters\SelectFilter::make('service')
                    ->options(fn () => Listing::query()->distinct()->pluck('service', 'service')->all()),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            MembershipsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListListings::route('/'),
            'create' => Pages\CreateListing::route('/create'),
            'edit' => Pages\EditListing::route('/{record}/edit'),
        ];
    }
}
