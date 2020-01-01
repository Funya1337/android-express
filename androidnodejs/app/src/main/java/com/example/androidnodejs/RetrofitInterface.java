package com.example.androidnodejs;

import java.util.HashMap;

import retrofit.Call;
import retrofit.http.Body;
import retrofit.http.POST;

public interface RetrofitInterface {
    @POST("/login")
    Call<LoginResult> executeLogin(@Body HashMap<String, String> map);

    @POST("/signup")
    Call<Void> executeSignup (@Body HashMap<String, String> map);

}
