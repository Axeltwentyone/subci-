<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MembershipResource\Pages;
use App\Models\Membership;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class MembershipResource extends Resource
{
    protected static ?string $model = Membership::class;

    protected static ?string $navigationIcon = 'heroicon-o-ticket';

    protected static ?string $navigationGroup = 'Marketplace';

    protected static ?string $navigationLabel = 'Achats';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('listing_id')
                    ->label('Annonce')
                    ->relationship('listing', 'service')
                    ->required(),
                Forms\Components\Select::make('buyer_id')
                    ->label('Acheteur')
                    ->relationship('buyer', 'name')
                    ->required(),
                Forms\Components\TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->suffix('FCFA'),
                Forms\Components\Select::make('status')
                    ->options(['active' => 'Active', 'cancelled' => 'Annulée'])
                    ->required(),
                Forms\Components\Select::make('payment_status')
                    ->label('Paiement')
                    ->options(['ok' => 'OK', 'failed' => 'Échec'])
                    ->required(),
                Forms\Components\DatePicker::make('renews_at')
                    ->label('Renouvellement'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('listing.service')
                    ->label('Service')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('listing.host.name')
                    ->label('Vendeur'),
                Tables\Columns\TextColumn::make('buyer.name')
                    ->label('Acheteur')
                    ->searchable(),
                Tables\Columns\TextColumn::make('price')
                    ->numeric()
                    ->sortable()
                    ->suffix(' FCFA'),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state) => $state === 'active' ? 'success' : 'gray'),
                Tables\Columns\TextColumn::make('payment_status')
                    ->label('Paiement')
                    ->badge()
                    ->color(fn (string $state) => $state === 'ok' ? 'success' : 'danger'),
                Tables\Columns\TextColumn::make('renews_at')
                    ->label('Renouvellement')
                    ->date('d/m/Y')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Achat')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(['active' => 'Active', 'cancelled' => 'Annulée']),
                Tables\Filters\SelectFilter::make('payment_status')
                    ->label('Paiement')
                    ->options(['ok' => 'OK', 'failed' => 'Échec']),
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

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListMemberships::route('/'),
            'create' => Pages\CreateMembership::route('/create'),
            'edit' => Pages\EditMembership::route('/{record}/edit'),
        ];
    }
}
