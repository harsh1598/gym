<?php

// $s3_bucket_path = 'env("APP_URL")';
$s3_bucket_path = 'https://marriagebeauromedias3.s3.ap-south-1.amazonaws.com';
$WEBSITE_URL = env("WEBSITE_URL");
return [
  'WEBSITE_URL' => $WEBSITE_URL,
  'LIMIT' => 20,
  'LIMIT_1' => 1,
  'TO_MAIL' => "vadhuvarsuchak@gmail.com",
  'LIMIT_50' => 50,
  'LIMIT_100' => 100,
  'NEW_LIMIT' => 24,
  'FIRE_BASE_KEY' => "",

  'IMAGE_PATH' => $s3_bucket_path . "/",

  'IMAGE_PATH_USER_STORE' => 'users',
  'IMAGE_PATH_USER_URL' =>  'users',

  'IMAGE_PATH_USER_DOCUMENT_STORE' => 'user-documents',
  'IMAGE_PATH_USER_DOCUMENT_URL' =>  'user-documents',

  'IMAGE_PATH_BANNER_STORE' => 'banners',
  'IMAGE_PATH_BANNER_URL' => 'banners',



  'MESH' => 'Mesh',
  'VISHABH' => 'Vrishabh',
  'MITHUN' => 'Mithun',
  'KARK' => 'Kark',
  'SING' => 'Simha',
  'KANYA' => 'Kanya',
  'TULA' => 'Tul',
  'VRISHIK' => 'Vrishchik',
  'DHANU' => 'Dhanu',
  'MAKAR' => 'Makar',
  'KUMBH' => 'Kumbh',
  'MEEN' => 'Meen',


  // 'MESH' => 'Mesh (Aries)',
  // 'VISHABH' => 'Vrishabh (Taurus)',
  // 'MITHUN' => 'Mithun (Gemini)',
  // 'KARK' => 'Kark (Cancer)',
  // 'SING' => 'Simha (Leo)',
  // 'KANYA' => 'Kanya (Virgo)',
  // 'TULA' => 'Tul (Libra)',
  // 'VRISHIK' => 'Vrishchik',
  // 'DHANU' => 'Dhanu (Sagittarius)',
  // 'MAKAR' => 'Makar (Capricorn)',
  // 'KUMBH' => 'Kumbh (Aquarius)',
  // 'MEEN' => 'Meen (Pisces)',


];
