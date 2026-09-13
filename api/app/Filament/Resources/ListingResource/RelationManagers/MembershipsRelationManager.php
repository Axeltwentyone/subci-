<?php

namespace App\Filament\Resources\ListingResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class MembershipsRelationManager extends RelationManager
{
    protected static string $relationship = 'memberships';

    protected static ?string $title = 'Membres';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
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

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('buyer.name')
            ->columns([
                Tables\Columns\TextColumn::make('buyer.name')
                    ->label('Acheteur')
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state) => $state === 'active' ? 'success' : 'gray'),
                Tables\Columns\TextColumn::make('payment_status')
                    ->label('Paiement')
                    ->badge()
                    ->color(fn (string $state) => $state === 'ok' ? 'success' : 'danger'),
                Tables\Columns\TextColumn::make('renews_at')
                    ->label('Renouvellement')
                    ->date('d/m/Y'),
                Tables\Columns\TextColumn::make('seller_rating')
                    ->label('Note')
                    ->formatStateUsing(fn (?int $state) => $state ? str_repeat('★', $state) : '—'),
            ])
            ->filters([])
            ->headerActions([])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make()->label('Annuler'),
            ])
            ->bulkActions([]);
    }
}
