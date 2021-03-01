import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:mobileapp/konstants/API.dart';
import 'package:mobileapp/konstants/colors.dart';
import 'package:mobileapp/pages/signup.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:http/http.dart' as http;

import 'CompanyInfo.dart';
import 'Dashboard.dart';



class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {

  String username;
  String password;
  bool obscureText=true;
  final storage=FlutterSecureStorage();

  makeRequest()async{
    print('hi');
    String params = '{"username":"${username.trim() }","password":"${password.trim()}"}';
    http.Response response = await http.post(loginUrl, headers: {
      "Content-Type": "application/json",
    },
        body: params);
    print(response.statusCode);
    print(params);
    print(response.body);
    if(response.statusCode==200){
      String token=jsonDecode(response.body)['token'];
      await storage.write(key: 'accToken', value: token);
      Map<String,String>headers={
        "token":"$token"
      };
      http.Response response1=await http.get(loginUrl,headers:headers );
      if(response1.statusCode==200){
        var decodedResponse=jsonDecode(response1.body);
        String cName=decodedResponse['companyName'];
        print(cName);
        if(cName.isEmpty) {
          Navigator.pushAndRemoveUntil(context, MaterialPageRoute(
              builder: (BuildContext context) => CompanyInfo()), (
              route) => false);
        }else{
          bool kycStatus=decodedResponse['kycStatus'];
          if(kycStatus==true){
            Fluttertoast.showToast(msg: 'Login Successful');
            Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (BuildContext context)=>Dashboard()), (route) => false);
          }else{
           }
        }
      }else{
        Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (BuildContext context)=>Login()), (route) => false);
      }
      // Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (BuildContext context)=>Dashboard()), (route) => false);
    }
    else if(response.statusCode==400){
      String msg=jsonDecode(response.body)['msg'];
      Fluttertoast.showToast(msg: msg);
      print('hi1');
      print('hi2');
      print(msg);
    }

  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.white,
        body: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Image.asset('assets/images/logo.png'),
                Text('Login',style: TextStyle(fontFamily: 'OpenSans',fontWeight: FontWeight.bold,fontSize: 24),),
                Padding(
                  padding: const EdgeInsets.only(left: 40,right: 40,top: 20,bottom: 20),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                          color:primaryColor
                      ),
                      borderRadius: BorderRadius.all(Radius.circular(7)),
                    ),
                    child: TextFormField(
                      onChanged: (val){
                        setState(() {
                          username=val;
                        });
                      },
                      style: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black),
                      decoration: InputDecoration(
                          contentPadding: EdgeInsets.only(left: 10),
                          border: InputBorder.none,
                          hintText: 'Username',
                          hintStyle: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black)
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 40,right: 40,bottom: 20),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                          color:primaryColor
                      ),
                      borderRadius: BorderRadius.all(Radius.circular(7)),
                    ),
                    child: TextFormField(
                      onChanged: (val){
                        setState(() {
                          password=val;
                        });
                      },
                      style: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black),
                      obscureText: obscureText,
                      decoration: InputDecoration(
                          suffixIcon: !obscureText?IconButton(icon:Icon(Icons.visibility,color: primaryColor,),onPressed: (){
                            setState(() {
                              obscureText=!obscureText;
                            });
                          },):IconButton(icon:Icon(Icons.visibility_off,color: Colors.black,),onPressed: (){
                            setState(() {
                              obscureText=!obscureText;
                            });
                          },),
                          contentPadding: EdgeInsets.only(left: 10,top: 15),
                          border: InputBorder.none,
                          hintText: 'Password',
                          hintStyle: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black)
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: InkWell(
                    onTap: ()async{
                      await makeRequest();
                    },
                    child: Material(
                      borderRadius: BorderRadius.circular(7),
                      shadowColor: Color(0x40000000),
                      child: Container(
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(color: Color(0x40000000),blurRadius: 4)
                          ],
                          color: buttonColor,
                          borderRadius: BorderRadius.circular(7),
                        ),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 70,vertical: 10),
                          child: Text('Login',style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontFamily: 'OpenSans',fontSize: 20),),
                        ),
                      ),
                    ),
                  ),
                ),
                SizedBox(height:10),
                GestureDetector(
                  onTap: (){
                    Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)=>SignUp()));
                  },
                  child: Row(
                    // crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text("Don't have an account?",style:TextStyle(color: Colors.black,fontWeight: FontWeight.bold,fontFamily: 'OpenSans',fontSize: 12),),
                      SizedBox(width: 5,),
                      Text("Sign Up",style: TextStyle(color: primaryColor,fontWeight: FontWeight.bold,fontFamily: 'OpenSans',fontSize: 12),),
                    ],
                  ),
                ),
                SizedBox(height:10),
                Text("Forgot Password",style: TextStyle(color: primaryColor,fontWeight: FontWeight.bold,fontFamily: 'OpenSans',fontSize: 12),),

              ],
            ),
          ),
        )
    );
  }
}
