<?php

namespace App\Http\Controllers;

use App\Http\Resources\AppNotificationResource;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = $request->user()->appNotifications()->latest()->get();

        return AppNotificationResource::collection($notifications);
    }
}
