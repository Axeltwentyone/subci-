<?php

namespace App\Http\Controllers;

use App\Http\Resources\WithdrawalResource;
use Illuminate\Http\Request;

class WithdrawalController extends Controller
{
    public function index(Request $request)
    {
        $withdrawals = $request->user()->withdrawals()->latest()->get();

        return WithdrawalResource::collection($withdrawals);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'amount' => ['required', 'integer', 'min:1'],
            'operator' => ['required', 'string'],
            'phone' => ['required', 'string'],
        ]);

        $user = $request->user();

        if ($data['amount'] > $user->host_balance) {
            abort(422, 'Solde insuffisant.');
        }

        $withdrawal = $user->withdrawals()->create([
            'amount' => $data['amount'],
            'operator' => $data['operator'],
            'phone' => $data['phone'],
            'status' => 'pending',
        ]);

        // Funds are reserved immediately; an admin approves or rejects the
        // actual payout from the back office (see WithdrawalResource).
        $user->decrement('host_balance', $data['amount']);

        return new WithdrawalResource($withdrawal);
    }
}
