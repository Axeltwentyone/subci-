<?php

namespace App\Filament\Resources;

use App\Filament\Resources\WithdrawalResource\Pages;
use App\Models\Withdrawal;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class WithdrawalResource extends Resource
{
    protected static ?string $model = Withdrawal::class;

    protected static ?string $navigationIcon = 'heroicon-o-banknotes';

    protected static ?string $navigationGroup = 'Paiements';

    protected static ?string $navigationLabel = 'Retraits';

    public static function getNavigationBadge(): ?string
    {
        $pending = static::getModel()::where('status', 'pending')->count();

        return $pending > 0 ? (string) $pending : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('user_id')
                    ->label('Hôte')
                    ->relationship('user', 'name')
                    ->required(),
                Forms\Components\TextInput::make('amount')
                    ->label('Montant')
                    ->required()
                    ->numeric()
                    ->suffix('FCFA'),
                Forms\Components\TextInput::make('operator')
                    ->required(),
                Forms\Components\TextInput::make('phone')
                    ->tel()
                    ->required(),
                Forms\Components\Select::make('status')
                    ->options(['pending' => 'En attente', 'paid' => 'Payé', 'rejected' => 'Rejeté'])
                    ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('user.name')
                    ->label('Hôte')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('amount')
                    ->numeric()
                    ->sortable()
                    ->suffix(' FCFA'),
                Tables\Columns\TextColumn::make('operator')
                    ->formatStateUsing(fn (string $state) => match ($state) {
                        'orange' => 'Orange Money',
                        'mtn' => 'MTN MoMo',
                        'moov' => 'Moov Money',
                        default => $state,
                    }),
                Tables\Columns\TextColumn::make('phone')
                    ->copyable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->formatStateUsing(fn (string $state) => match ($state) {
                        'pending' => 'En attente',
                        'paid' => 'Payé',
                        'rejected' => 'Rejeté',
                        default => $state,
                    })
                    ->color(fn (string $state) => match ($state) {
                        'paid' => 'success',
                        'rejected' => 'danger',
                        default => 'warning',
                    }),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Demandé')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(['pending' => 'En attente', 'paid' => 'Payé', 'rejected' => 'Rejeté'])
                    ->default('pending'),
            ])
            ->actions([
                Tables\Actions\Action::make('markPaid')
                    ->label('Marquer payé')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (Withdrawal $record) => $record->status === 'pending')
                    ->requiresConfirmation()
                    ->action(function (Withdrawal $record) {
                        $record->update(['status' => 'paid']);
                        Notification::make()->title('Retrait marqué comme payé')->success()->send();
                    }),
                Tables\Actions\Action::make('reject')
                    ->label('Rejeter')
                    ->icon('heroicon-o-x-circle')
                    ->color('danger')
                    ->visible(fn (Withdrawal $record) => $record->status === 'pending')
                    ->requiresConfirmation()
                    ->modalDescription('Le montant sera recrédité sur le solde de l\'hôte.')
                    ->action(function (Withdrawal $record) {
                        $record->update(['status' => 'rejected']);
                        $record->user()->increment('host_balance', $record->amount);
                        Notification::make()->title('Retrait rejeté, solde recrédité')->success()->send();
                    }),
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListWithdrawals::route('/'),
            'create' => Pages\CreateWithdrawal::route('/create'),
            'edit' => Pages\EditWithdrawal::route('/{record}/edit'),
        ];
    }
}
