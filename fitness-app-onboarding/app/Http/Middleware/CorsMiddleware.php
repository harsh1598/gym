<?php

namespace App\Http\Middleware;

use Closure;


class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // $headers = [
        //     'Access-Control-Allow-Origin'      => '*',
        //     'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE',
        //     'Access-Control-Allow-Credentials' => 'true',
        //     'Access-Control-Max-Age'           => '86400',
        //     'Access-Control-Allow-Headers'     => '*'
        // ];

        // if ($request->isMethod('OPTIONS')) {
        //     return response()->json(["method" => "OPTIONS"], 200, $headers);
        // }

        // $response = $next($request);
        // foreach($headers as $key => $value)
        // {
        //     $response->header($key, $value);
        // }

        // $response->headers->set('Access-Control-Allow-Origin', '*');
        // $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        // $response->headers->set('Access-Control-Allow-Headers', '*');
        // $response->headers->set('Access-Control-Max-Age', 'true');
        // $response->headers->set('Access-Control-Max-Age', '86400');
        // $response->headers->set('Access-Control-Allow-Headers', '*');
        // return $response;

        // $headers = [
        //     'Access-Control-Allow-Origin'      => '*',
        //     'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE',
        //     'Access-Control-Max-Age'           => '86400',
        //     'Access-Control-Allow-Headers'     => '*,Content-Type,usi,osversion,devicetype,devicetoken,region,timezone,appversion,devicemodel,sdkversion,usertoken,wmxcke, Accept,app,Authorization,appid',
        // ];
        // if ($request->isMethod('OPTIONS')) {
        //     return response()->json(['method' => 'OPTIONS'], 200, $headers);
        // }
        $response = $next($request);
        // foreach ($headers as $key => $value) {
        //     $response->header($key, $value);
        // }
        return $response;
    }
}
