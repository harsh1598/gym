<?php // Code within app\Helpers\Helper.php

namespace App\Helpers;

use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Log;
use Mandrill;
use App\Models\Onboarding\User_devices;
use SendGrid;
use App\Countries;
use App\Models\MasterData;
use App\Models\User;
use App\Models\UserDevices;
use DateTime;
use DateTimeZone;
use Auth;
use Carbon\Carbon;
use DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class Helper
{
    public  static function public_path($path = null)
    {
        return rtrim(app()->basePath('public/' . $path), '/');
    }


    public  static function kThousandFormatter($num = null)
    {
        if (!empty($num)) {
            if (strlen($num) > 3) {
                $x = round($num);
                $x_number_format = number_format($x);
                $x_array = explode(',', $x_number_format);
                $x_parts = array('k', 'm', 'b', 't');
                $x_count_parts = count($x_array) - 1;
                $x_display = abs(122);
                $x_display = $x_array[0] . ((int) $x_array[1][0] !== 0 ? '.' . $x_array[1][0] : '');
                $x_display .= $x_parts[$x_count_parts - 1];
            } else {
                $x_display = $num;
            }

            return $x_display;
        }
    }

    public  static function LakhThousandFormatter($num = null)
    {
        if (!empty($num)) {
            $x_display =  round($num / 100000, 2);

            return $x_display;
        }
    }

    public  static function checkEMail($email = null)
    {
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

            return true;
        } else {

            return false;
        }
    }


    public static function defaultTimeZoneOffset()
    {
        return 8;
    }

    public static function defaultTimeZone()
    {
        return "Asia/Kuala_Lumpur";
    }

    public static function getIndex20($offset)
    {
        if ($offset === 0) {
            return 0;
        } else {
            return ($offset * 20);
        }
    }

    public static function getIndex1($offset)
    {
        if ($offset === 0) {
            return 0;
        } else {
            return ($offset * 1);
        }
    }

    public static function getIndex($offset)
    {
        if ($offset === 0) {
            return 0;
        } else {
            return ($offset *  config("constants.LIMIT"));
        }
    }

    public static function getNextOffset20($offset, $count)
    {
        if ($count === 20) {
            return ($offset + 1);
        } else {
            return -1;
        }
    }
    public static function getNextOffset1($offset, $count)
    {
        if ($count === 1) {
            return ($offset + 1);
        } else {
            return -1;
        }
    }


    public static function getIndex50($offset)
    {
        if ($offset === 0) {
            return 0;
        } else {
            return ($offset *  config("constants.LIMIT_50"));
        }
    }

    public static function getNextOffset50($offset, $count)
    {
        if ($count === config("constants.LIMIT_50")) {
            return ($offset + 1);
        } else {
            return -1;
        }
    }

    public static function getIndex100($offset)
    {
        if ($offset === 0) {
            return 0;
        } else {
            return ($offset *  config("constants.LIMIT_100"));
        }
    }

    public static function getNextOffset100($offset, $count)
    {
        if ($count === config("constants.LIMIT_100")) {
            return ($offset + 1);
        } else {
            return -1;
        }
    }


    public static function getNextOffset($offset, $count)
    {
        if ($count === config("constants.LIMIT")) {
            return ($offset + 1);
        } else {
            return -1;
        }
    }
    public static function getNewIndex($offset)
    {
        if ($offset === 0) {
            return 0;
        } else {
            return ($offset *  config("constants.NEW_LIMIT"));
        }
    }
    public static function getNewNextOffset($offset, $count)
    {
        if ($count === config("constants.NEW_LIMIT")) {
            return ($offset + 1);
        } else {
            return -1;
        }
    }

    public static function startsWith($haystack, $needle)
    {
        $length = strlen($needle);
        return (substr($haystack, 0, $length) === $needle);
    }

    public static function endsWith($haystack, $needle)
    {
        $length = strlen($needle);
        if ($length == 0) {
            return true;
        }

        return (substr($haystack, -$length) === $needle);
    }

    public static function generateOTP()
    {
        return "1234";
        // return mt_rand(1000, 9999);
    }

    public static function sendOTPViaSMS($body, $mobile_country_code, $phone)
    {
        /*  try {
            $twilioAccountSid   = getenv("TWILIO_SID");
            $twilioAuthToken    = getenv("TWILIO_TOKEN");
    
            if(!empty($twilioAccountSid))
            {
                $twilioClient = new TwilioClient($twilioAccountSid, $twilioAuthToken);
                $myTwilioNumber = getenv("TWILIO_NUMBER");
                $twilioClient->messages->create(
                    // Where to send a text message
                    "+".$mobile_country_code.$phone,
                    array(
                        "from" => $myTwilioNumber,
                        "body" => $body
                    )
                );
            }
           
        }
        catch (\Exception $e) {
        }*/


        if (Str::startsWith($phone, 0)) {
            $phone = substr($phone, 1);
        }
        $mobile = $mobile_country_code . $phone;

        $body = urldecode($body);
        $url = "http://smpplive.com/api/send_sms/single_sms?to=$mobile&content=$body&username=FawzDea&password=Fa@R4780&from=FAWZDEAL"; //Rivet%20SMS

        $client = new \GuzzleHttp\Client(['http_errors' => false]);
        $res = $client->get($url, [
            'headers' => [
                'Accept' => 'application/json',
            ],
        ]);
        if ($res->getStatusCode() === 200) {
            $content = $res->getBody()->getContents();
            $content = json_decode($content, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                return null;
            }
            return $content;
        } else {
            return null;
        }
    }


    public static function generateReferralCode($user_id, $firstname, $lastname)
    {
        $referral_code = "";

        $limit = 6;
        $referral_code = substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, $limit);
        return $referral_code;
    }

    // public static function saveUserDeviceInfo($device_token, $app_version, $user_id,  $platform)
    // {

    //     $UpdateloginDetails = User::where('id', '=', $user_id)->update(array('app_version' => $app_version, 'platform' => $platform, 'updated_at' => date('Y-m-d H:i:s')));
    //     if (!empty($device_token)) {
    //         $isDeviceTokenExist = UserDevices::isDeviceTokenExist($device_token, $user_id, $platform);
    //         if (empty($isDeviceTokenExist)) {
    //             $RegisterDeviceToken = UserDevices::registerDeviceToken($device_token, $user_id, $platform);
    //         }
    //     }
    // }


    public static function fileUpload($file, $s3_folder, $fileName)
    {
        // $fileName = "IMG_".time()."_".$file->getClientOriginalName(); //Display File Name

        $fileExtention = $file->getClientOriginalExtension(); //Display File Extension

        $fileRealPath = $file->getRealPath(); //Display File Real Path

        $FileSize = $file->getSize(); //Display File Size

        $fileMimeType = $file->getMimeType(); //Display File Mime Type

        $destinationPath = $s3_folder; //Move Uploaded File

        // $newname = basename($fileName,".$fileExtention") . '_thumb.' . $fileExtention;

        //commented aws code
        return self::uploadImageOnS3Bucket($s3_folder . "/" . $fileName, $fileRealPath, $fileMimeType);


        // if ($file->move($destinationPath, $fileName)) {

        //     $data[] = [
        //         'filename' => $fileName,
        //         'Extension' => $fileExtention,
        //         'fileRealPath' => $fileRealPath,
        //         'filesize' => $FileSize,
        //         'filemimetype' => $fileMimeType,
        //         'destinationpath' => $destinationPath
        //     ];
        //     return $data;
        // } else {
        //     return false;
        // }
    }


    public static function uploadImageOnS3Bucket($image_name, $image, $fileMimeType)
    {
        // $final_mine_type = "image/jpeg";
        // if (!empty($fileMimeType)) {
        //     if ($fileMimeType != 'application/octet-stream') {
        //         $final_mine_type = $fileMimeType;
        //     } else {
        //         $final_mine_type = 'image/jpeg';
        //     }
        // }

        // $s3 = app()->make('aws')->createClient('s3');
        // return  $s3->putObject(array(
        //     'Bucket'     => 'fawzs3',
        //     'Key'        => $image_name,
        //     'SourceFile' => $image,
        //     'ContentType' => $final_mine_type,
        //     'ACL' => 'public-read'
        // ));
        $final_mine_type = "image/jpeg";
        if (!empty($fileMimeType) && $fileMimeType != 'application/octet-stream') {
            $final_mine_type = $fileMimeType;
        }

        // Use Laravel's Storage facade for S3
        return Storage::disk('s3')->put($image_name, file_get_contents($image), [
            // 'visibility' => 'public',
            'ContentType' => $final_mine_type,
        ]);
    }
    public static function server()
    {
        return app('env');
    }
    public static function fileUploadToLocal($file, $destinationFolder, $fileName)
    {
        // Define the destination path
        $destinationPath = rtrim($destinationFolder, '/') . '/';
        // Move the file to the destination
        $file->move($destinationPath, $fileName);

        return $fileName; // Return the file name
    }
    public static function print_sql($query)
    {
        dump(Str::replaceArray('?', $query->getBindings(), $query->toSql()));
    }
    public static function getFormatedTime($t)
    {
        return date('h:i A', strtotime($t));
    }

    public static function  sendSms($mobile, $otp)
    {

        if (!Helper::endsWith($mobile, "12345")) {
            $message = urlencode("$otp is OTP for Nimbalkar website.");
            $url = "http://sms.messageindia.in/sendSMS?username=sushant&message=$message&sendername=NIMVVS&smstype=TRANS&numbers=$mobile&apikey=26926f6b-e1b3-4273-99d1-22f9f209e13a";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, 0);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $response = curl_exec($ch);
            $err = curl_error($ch);  //if you need
            curl_close($ch);
            return $response;
        }
    }

    static function  firstLetterUpperCase($string)
    {
        $string = mb_strtoupper(mb_substr($string, 0, 1)) . mb_substr(strtolower($string), 1);
        return $string;
    }

    function decryptCCAvenue($encryptedText, $key)
    {
        $secretKey         = $this->hextobin(md5($key));
        $initVector         =  pack("C*", 0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f);
        $encryptedText      = $this->hextobin($encryptedText);
        $decryptedText         =  openssl_decrypt($encryptedText, "AES-128-CBC", $secretKey, OPENSSL_RAW_DATA, $initVector);
        return $decryptedText;
    }

    // *********** Padding Function *********************
    function pkcs5_pad($plainText, $blockSize)
    {
        $pad = $blockSize - (strlen($plainText) % $blockSize);
        return $plainText . str_repeat(chr($pad), $pad);
    }

    // ********** Hexadecimal to Binary function for php 4.0 version ********
    function hextobin($hexString)
    {
        $length = strlen($hexString);
        $binString = "";
        $count = 0;
        while ($count < $length) {
            $subString = substr($hexString, $count, 2);
            $packedString = pack("H*", $subString);
            if ($count == 0) {
                $binString = $packedString;
            } else {
                $binString .= $packedString;
            }

            $count += 2;
        }
        return $binString;
    }
}
