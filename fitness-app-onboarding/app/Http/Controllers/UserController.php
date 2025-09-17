<?php

namespace App\Http\Controllers;

use App\Helpers\Helper;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PHPUnit\TextUI\Help;

class UserController extends Controller
{
    public function login(Request $request)
    {

        $Validator = Validator::make($request->all(), [
            "username" => "Required",
            "password" => "Required",
        ]);
        if ($Validator->fails()) {
            return response()->json(['message' => $Validator->errors()->first()], 400);
        }
        $user = User::where(function ($query) use ($request) {
            $query->where('email', $request->username)
                ->orWhere('mobile', $request->username);
        })->where('status', '!=', 'DELETED')->first();
        if (!empty($user) && Hash::check($request->password, $user->password)) {
            // if ($user->status == 'PENDING') {
            //     return response()->json(['message' => trans('messages.USER_PENDING')], 400);
            // } else
            if ($user->status == 'INACTIVE' || $user->status == 'INACTIVE' || $user->block == 'Y') {
                return response()->json(['message' => trans('messages.USER_BLOCKED_SUSUPENDED')], 400);
            } else {
                $objToken =  $user->createToken('fitness-app-onboarding');
                $token = $objToken->accessToken;
                return response()->json(['access_token' => $token, 'status' => 'SUCCESS'], 200);
            }
        } else {
            return response()->json(['message' => trans('messages.INVALID_CREDANTIALS')], 400);
        }
    }
    public function me()
    {
        $data = User::isUserValid();
        if (!empty($data)) {
            return response()->json([
                'status' => 'success',
                'message' => 'ok',
                'result' => $data,
            ], 200);
        } else {
            return response()->json(['message' => trans('messages.NO_RECORD_FOUND'), 'status' => trans('messages.ERROR')], 400);
        }
    }
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "email" => "required|email|unique:users,email",
            "dial_code" => "required|string|max:10",
            "country_code" => "required|string|max:10",
            "mobile" => "required|string|max:20|unique:users,mobile",
            "password" => "required|string|min:8",
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }

        $user = new User();
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('dial_code')) {
            $user->dial_code = $request->dial_code;
        }
        if ($request->has('country_code')) {
            $user->country_code = $request->country_code;
        }
        if ($request->has('mobile')) {
            $user->mobile = $request->mobile;
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->save();
        $user->status = 'PENDING'; // Set status to PENDING for OTP verification
        // SEND OTP TO USER
        $otp = Helper::generateOTP();
        $user->otp = $otp;
        $user->save();
        // NotificationHelper::sendOtp($user->mobile, $otp);
        return response()->json([
            'status' => 'SUCCESS',
            'message' => trans('messages.USER_SIGNUP_SUCCESSFULLY'),
        ], 201);
    }
    public function signup_steps(Request $request)
    {
        $user = User::isUserValid();
        $user = User::where('id', $user->id)->first();
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('dial_code')) {
            $user->dial_code = $request->dial_code;
        }
        if ($request->has('country_code')) {
            $user->country_code = $request->country_code;
        }
        if ($request->has('mobile')) {
            $user->mobile = $request->mobile;
        }
        if ($request->has('gender')) {
            $user->gender = $request->gender;
        }
        if ($request->has('birth_year')) {
            $user->birth_year = $request->birth_year;
        }
        if ($request->has('daily_workout_time')) {
            $user->daily_workout_time = $request->daily_workout_time;
        }
        if ($request->has('city')) {
            $user->city = $request->city;
        }
        if ($request->has('preferred_language')) {
            $user->preferred_language = $request->preferred_language;
        }
        if ($request->has('weight')) {
            $user->weight = $request->weight;
        }
        if ($request->has('height')) {
            $user->height = $request->height;
        }
        if ($request->has('exp_level')) {
            $user->exp_level = $request->exp_level;
        }
        $user->is_fat_loss = $request->is_fat_loss ?? 0;
        $user->is_gain_muscles = $request->is_gain_muscles ?? 0;
        $user->is_stay_fit = $request->is_stay_fit ?? 0;
        $user->is_yoga = $request->is_yoga ?? 0;
        if (!empty($request->last_visited_tab)) {
            $user->last_visited_tab = $request->last_visited_tab;
        }
        $user->save();
        return response()->json([
            'status' => 'SUCCESS',
            'message' => trans('messages.USER_SIGNUP_SUCCESSFULLY'),
        ], 201);
    }

    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "username" => "required",
            'otp' => 'required|digits:4',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $user = User::where(function ($query) use ($request) {
            $query->where('email', $request->username)
                ->orWhere('mobile', $request->username);
        })->where('status', '!=', 'DELETED')->first();
        if ($user && $user->otp == $request->otp) {
            $user->otp = null;
            $user->status = 'ACTIVE';
            $user->save();
            return response()->json([
                'status' => 'SUCCESS',
                'message' => trans('messages.OTP_VERIFIED_SUCCESSFULLY'),
            ], 200);
        } else {
            return response()->json([
                'status' => 'ERROR',
                'message' => trans('messages.INVALID_OTP'),
            ], 400);
        }
    }
    public function resendOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "username" => "required",
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }
        $user = User::where(function ($query) use ($request) {
            $query->where('email', $request->username)
                ->orWhere('mobile', $request->username);
        })->where('status', '!=', 'DELETED')->first();
        if ($user) {
            $otp = Helper::generateOTP();
            $user->otp = $otp;
            $user->save();
            // NotificationHelper::sendOtp($user->mobile, $otp);
            return response()->json([
                'status' => 'SUCCESS',
                'message' => trans('messages.OTP_RESENT_SUCCESSFULLY'),
            ], 200);
        } else {
            return response()->json([
                'status' => 'ERROR',
                'message' => trans('messages.NO_RECORD_FOUND'),
            ], 400);
        }
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "username" => "required",
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }

        $user = User::where(function ($query) use ($request) {
            $query->where('email', $request->username)
                ->orWhere('mobile', $request->username);
        })->where('status', '!=', 'DELETED')->first();

        if ($user) {
            $otp = Helper::generateOTP();
            $user->otp = $otp;
            $user->save();
            // NotificationHelper::sendOtp($user->mobile, $otp);
            return response()->json([
                'status' => 'SUCCESS',
                'message' => trans('messages.OTP_SENT_FORGOT_PASSWORD'),
            ], 200);
        } else {
            return response()->json([
                'status' => 'ERROR',
                'message' => trans('messages.NO_RECORD_FOUND'),
            ], 400);
        }
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "username" => "required",
            'otp' => 'required|digits:4',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 400);
        }

        $user = User::where(function ($query) use ($request) {
            $query->where('email', $request->username)
                ->orWhere('mobile', $request->username);
        })->where('status', '!=', 'DELETED')->first();

        if ($user && $user->otp == $request->otp) {
            $user->password = Hash::make($request->password);
            $user->otp = null;
            $user->save();
            return response()->json([
                'status' => 'SUCCESS',
                'message' => trans('messages.PASSWORD_RESET_SUCCESSFULLY'),
            ], 200);
        } else {
            return response()->json([
                'status' => 'ERROR',
                'message' => trans('messages.INVALID_OTP'),
            ], 400);
        }
    }
}
