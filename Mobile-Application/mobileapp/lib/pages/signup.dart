import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:mobileapp/konstants/API.dart';
import 'package:mobileapp/konstants/colors.dart';
import 'package:http/http.dart' as http;
import 'EmailSent.dart';

class SignUp extends StatefulWidget {
  @override
  _SignUpState createState() => _SignUpState();
}

class _SignUpState extends State<SignUp> {

  String name;
  String email;
  String password;
  String username;
  bool obscureText=true;
  String mobileNo;
  String walletAddress;
  String mno;
  TextEditingController _controller=TextEditingController();


  makeRequest()async{
    mobileNo=mno;
    String params = '{"name":"${name.trim()}","email":"$email","username":"${username.trim()}","password":"${password.trim()}","mobileNo":"${mobileNo.trim()}","walletAddr":"${walletAddress.trim()}"}';
    http.Response response = await http.post(signUpUrl, headers: {
      "Content-Type": "application/json",
    },
        body: params);
    print(params);
    print(signUpUrl);
    print(response.statusCode);
    print(response.body);
    if(response.statusCode==200){
      Fluttertoast.showToast(msg: 'New user created',backgroundColor: Colors.black,textColor: Colors.white);
      Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)=>EmailSent()));
    }else{
      Fluttertoast.showToast(msg: 'Something went wrong',backgroundColor: Colors.black,textColor: Colors.white);
    }
//    final newURI = uri.replace(queryParameters: params);
//    Uri,Uri.https(authority, unencodedPath)
  }

  @override
  Widget build(BuildContext context) {
    return  Scaffold(
      // resizeToAvoidBottomPadding: true,
        backgroundColor: Colors.white,
        body: Center(
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Image.asset('assets/images/logo.png'),
                Text('Sign Up',style: TextStyle(fontFamily: 'OpenSans',fontWeight: FontWeight.bold,fontSize: 24),),
                Padding(
                  padding: const EdgeInsets.only(left: 20,right: 20,top: 20,bottom: 10),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                          color:primaryColor
                      ),
                      borderRadius: BorderRadius.all(Radius.circular(7)),
                    ),
                    child: TextFormField(
                      style: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black),
                      onChanged: (val){
                        setState(() {
                          name=val;
                        });
                      },
                      decoration: InputDecoration(
                          contentPadding: EdgeInsets.only(left: 10),
                          border: InputBorder.none,
                          hintText: 'Name',
                          hintStyle: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black)
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 20,right: 20,top: 10,bottom: 10),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                          color:primaryColor
                      ),
                      borderRadius: BorderRadius.all(Radius.circular(7)),
                    ),
                    child: TextFormField(
                      style: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black),
                      onChanged: (val){
                        setState(() {
                          email=val;
                        });
                      },
                      decoration: InputDecoration(
                          contentPadding: EdgeInsets.only(left: 10),
                          border: InputBorder.none,
                          hintText: 'Email',
                          hintStyle: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black)
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 20,right: 20,top: 10,bottom: 10),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                          color:primaryColor
                      ),
                      borderRadius: BorderRadius.all(Radius.circular(7)),
                    ),
                    child: TextFormField(
                      style: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black),
                      onChanged: (val){
                        setState(() {
                          username=val;
                        });
                      },
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
                  padding: const EdgeInsets.only(left: 20,right: 20,bottom: 10,top: 10),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                          color:primaryColor
                      ),
                      borderRadius: BorderRadius.all(Radius.circular(7)),
                    ),
                    child: TextFormField(
                      style: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black),
                      onChanged: (val){
                        setState(() {
                          password=val;
                        });
                      },
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
                  padding: const EdgeInsets.only(left: 20,right: 20,top: 10,bottom: 10),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                          color:primaryColor
                      ),
                      borderRadius: BorderRadius.all(Radius.circular(7)),
                    ),
                    child: TextFormField(
                      style: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black),
                      onChanged: (val){
                        setState(() {
                          mno=val;
                        });
                      },
                      keyboardType: TextInputType.number,
                      decoration: InputDecoration(
                          contentPadding: EdgeInsets.only(left: 10),
                          border: InputBorder.none,
                          hintText: 'Phone Number',
                          hintStyle: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black)
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 20,right: 20,top: 20,bottom: 10),
                  child: Container(
                    decoration: BoxDecoration(
                      border: Border.all(
                          color:primaryColor
                      ),
                      borderRadius: BorderRadius.all(Radius.circular(7)),
                    ),
                    child: TextFormField(
                      style: TextStyle(fontSize: 14,fontFamily: 'OpenSans',fontWeight: FontWeight.bold,color: Colors.black),
                      onChanged: (val){
                        setState(() {
                          walletAddress=val;
                        });
                      },
                      controller: _controller,
                      decoration: InputDecoration(
                          contentPadding: EdgeInsets.only(left: 10,top: 15),
                          // contentPadding: EdgeInsets.only(left: 10),
                          border: InputBorder.none,
                          hintText: 'Wallet Address',
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
                      // Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)=>CompanyInfo()));
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
                          child: Text('Sign Up',style: TextStyle(color: Colors.white,fontWeight: FontWeight.bold,fontFamily: 'OpenSans',fontSize: 20),),
                        ),
                      ),
                    ),
                  ),
                ),
                GestureDetector(
                  onTap: (){
                    Navigator.pop(context);
                  },
                  child: Row(
                    // crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text("Already have an account ?",style:TextStyle(color: Colors.black,fontWeight: FontWeight.bold,fontFamily: 'OpenSans',fontSize: 12),),
                      SizedBox(width: 5,),
                      Text("Login",style: TextStyle(color: primaryColor,fontWeight: FontWeight.bold,fontFamily: 'OpenSans',fontSize: 12),),
                    ],
                  ),
                ),
                SizedBox(height:20),
              ],
            ),
          ),
        )
    );
  }
}
