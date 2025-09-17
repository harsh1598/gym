<?php

use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
// Route::post('/ouath-token', [UserController::class, 'login']);


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// ========================= ON BOARDING API's ============================ //
Route::post('/login', [UserController::class, 'login']);

Route::put('/verify_otp', [UserController::class, 'verifyOtp']);
Route::put('/resend_otp', [UserController::class, 'resendOtp']);

Route::put('/forgot_password', [UserController::class, 'forgotPassword']);
Route::put('/reset_password', [UserController::class, 'resetPassword']);

// ========================= ON BOARDING API's ============================ //


// ========================= SIGNUP API's ============================ //
Route::post('/signup', [UserController::class, 'signup']);
// ========================= SIGNUP API's ============================ //

$router->group(['middleware' => 'auth:api'], function () {
    Route::get('/me', [UserController::class, 'me']);
    Route::post('/signup_steps', [UserController::class, 'signup_steps']);
});
