<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Notifications\Notification;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon = 'heroicon-o-users';

    protected static ?string $navigationGroup = 'Communauté';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Compte')
                    ->columns(2)
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required(),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->unique(ignoreRecord: true),
                        Forms\Components\TextInput::make('phone')
                            ->tel(),
                        Forms\Components\TextInput::make('password')
                            ->password()
                            ->dehydrateStateUsing(fn ($state) => $state)
                            ->dehydrated(fn ($state) => filled($state))
                            ->required(fn (string $context) => $context === 'create')
                            ->helperText('Laisser vide pour ne pas changer le mot de passe.'),
                        Forms\Components\Toggle::make('is_admin')
                            ->label('Accès admin')
                            ->helperText('Autorise cet utilisateur à se connecter à ce back-office.'),
                    ]),
                Forms\Components\Section::make('Vérification d\'identité (KYC)')
                    ->columns(2)
                    ->schema([
                        Forms\Components\Select::make('kyc_status')
                            ->options([
                                'none' => 'Non vérifié',
                                'checkingSub' => 'Identité OK — vérifie son abonnement',
                                'verified' => 'Vérifié',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('kyc_name')
                            ->label('Nom vérifié par Didit')
                            ->disabled(),
                        Forms\Components\TextInput::make('kyc_session_id')
                            ->label('Session Didit')
                            ->disabled(),
                    ]),
                Forms\Components\Section::make('Statistiques vendeur')
                    ->columns(3)
                    ->schema([
                        Forms\Components\TextInput::make('host_balance')
                            ->label('Solde (FCFA)')
                            ->required()
                            ->numeric()
                            ->default(0),
                        Forms\Components\TextInput::make('rating')
                            ->required()
                            ->numeric()
                            ->step(0.1)
                            ->default(5),
                        Forms\Components\TextInput::make('transactions_count')
                            ->label('Ventes totales')
                            ->required()
                            ->numeric()
                            ->default(0),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->copyable(),
                Tables\Columns\IconColumn::make('is_admin')
                    ->label('Admin')
                    ->boolean(),
                Tables\Columns\TextColumn::make('kyc_status')
                    ->label('KYC')
                    ->badge()
                    ->formatStateUsing(fn (string $state) => match ($state) {
                        'none' => 'Non vérifié',
                        'checkingSub' => 'Identité OK',
                        'verified' => 'Vérifié',
                        default => $state,
                    })
                    ->color(fn (string $state) => match ($state) {
                        'verified' => 'success',
                        'checkingSub' => 'warning',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('rating')
                    ->numeric(1)
                    ->sortable(),
                Tables\Columns\TextColumn::make('transactions_count')
                    ->label('Ventes')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('host_balance')
                    ->label('Solde')
                    ->numeric()
                    ->sortable()
                    ->suffix(' FCFA'),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Inscrit')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('kyc_status')
                    ->label('KYC')
                    ->options([
                        'none' => 'Non vérifié',
                        'checkingSub' => 'Identité OK',
                        'verified' => 'Vérifié',
                    ]),
                Tables\Filters\TernaryFilter::make('is_admin')
                    ->label('Admin'),
            ])
            ->actions([
                Tables\Actions\Action::make('forceVerify')
                    ->label('Vérifier manuellement')
                    ->icon('heroicon-o-shield-check')
                    ->color('success')
                    ->visible(fn (User $record) => $record->kyc_status !== 'verified')
                    ->requiresConfirmation()
                    ->action(function (User $record) {
                        $record->update(['kyc_status' => 'verified']);
                        Notification::make()->title('Identité vérifiée manuellement')->success()->send();
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
            'index' => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit' => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
