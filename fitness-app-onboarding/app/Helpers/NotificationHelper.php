<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

use App\Models\Booking;
use App\Models\Notification;
use App\Models\RegisterDeviceToken;
use App\Models\SendNotification;
use App\Models\Service;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Str;

class NotificationHelper
{
    public static function notifyForsendToAccount($from_user, $to_user,  $refs_id)
    {
        $title = 'HANDPICK-SUGGESTION';
        $message = " has send you some profiles in your handpick suggetions ";
        $type = 'HANDPICK-SUGGESTION';
        $from_user =  $from_user;
        $to_user = $to_user;
        $refs_id = $refs_id ?? null;
        self::notify($to_user, $from_user, $title, $message, $type, $refs_id);
        return true;
    }

    public static function notify($to_user, $from_user, $title, $message, $type, $reference_id, $save_in_db = true)
    {
        // $admin_notification_id   =  $reference_id;
        // if (!empty($to_user)) {
        //     $to_user = User::where("uuid", $to_user)->where('status', '!=', 'DELETED')->first();
        // }
        // if (!empty($from_user)) {
        //     $from_user = User::where("uuid", $from_user)->where('status', '!=', 'DELETED')->first();
        // }
        // $notification_id = null;
        // if ($save_in_db) {
        //     $notification_id = Notification::addData($to_user, $from_user, $title, $message, $type, $reference_id, $admin_notification_id);
        // }

        // $firebaseToken = RegisterDeviceToken::whereNotNull('token')->where("user_id", $to_user->uuid)->pluck('token')->all(); //
        // // print_R($firebaseToken);
        // // die;

        // $SERVER_API_KEY = config("constants.FIRE_BASE_KEY");
        // $noti_data =  [
        //     "title" => $title,
        //     "reference_id" => $reference_id,
        //     "body" => $message,
        //     "type" => $type,
        //     "badge" => 1,
        //     "sound" => "default",
        //     "fuid" => $from_user->uuid ?? null,
        //     "uid" => $to_user->uuid ?? null,
        //     "nid" => $notification_id,
        // ];

        // $data = [
        //     'collapse_key' => 'new' . time(),
        //     "priority" => "high",
        //     "content_available" => true,
        //     "mutable_content" => true,
        //     "show_in_foreground" => true,
        //     "registration_ids" => $firebaseToken,
        //     "notification" => $noti_data,
        //     "data" => $noti_data
        // ];
        // $dataString = json_encode($data);

        // $headers = [
        //     'Authorization: key=' . $SERVER_API_KEY,
        //     'Content-Type: application/json',
        // ];

        // $ch = curl_init();

        // curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        // curl_setopt($ch, CURLOPT_POST, true);
        // curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);

        // $response = curl_exec($ch);

        // // dd($noti_data);
        // return $response;
    }
}
