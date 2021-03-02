import 'package:country_code_picker/country_code_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:mobileapp/konstants/API.dart';
import 'package:http/http.dart' as http;
import 'package:mobileapp/konstants/colors.dart';

import 'KycVerifiedScreen.dart';

class PassportKycScreen extends StatefulWidget {
  @override
  _PassportKycScreenState createState() => _PassportKycScreenState();
}

class _PassportKycScreenState extends State<PassportKycScreen> {
  final storage=FlutterSecureStorage();
  String cc='IN';
  String passportNo;

  makeRequest()async{
    String url=passportUrl;
    String body='{"cc":"$cc","dl_no":"$passportNo"}';
    String accToken=await storage.read(key: 'accToken');
    Map<String,String>header={
      "Content-Type":"application/json",
      "token":"$accToken"
    };
    http.Response response=await http.post(url,headers: header,body: body);
    print(body);
    print(response.statusCode);
    print(response.body);
    if(response.statusCode==200){
      Fluttertoast.showToast(msg: 'KYC Done',backgroundColor: Colors.black,textColor: Colors.white);
      Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)=>KycVerifiedScreen()));
    }else{
      Fluttertoast.showToast(msg: 'Please try again',backgroundColor: Colors.black,textColor: Colors.white);
    }
  }



  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        backgroundColor: primaryColor,
        body: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Column(
              children: [
                Image.asset('assets/images/kyc_verification.png'),
                Text('Hey {Name}\nPlease complete the KYC before moving on',style: TextStyle(fontFamily: 'OpenSansSemi',fontWeight: FontWeight.w400,fontSize: 15,color: Colors.white),),
              ],
            ),
            Column(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 50,vertical: 8),
                  child: Material(
                    borderRadius: BorderRadius.circular(7),
                    shadowColor: Color(0x40000000),
                    child: Container(
                      width: MediaQuery.of(context).size.width,
                      decoration: BoxDecoration(
                        boxShadow: [
                          BoxShadow(color: Color(0x40000000),blurRadius: 4)
                        ],
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(7),
                      ),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 12,horizontal: 10),
                        child: TextFormField(
                          onChanged: (val){
                            setState(() {
                              passportNo=val;
                            });
                          },
                          textAlign: TextAlign.center,
                          decoration: InputDecoration.collapsed(hintText: 'Passport Number',hintStyle: TextStyle(fontFamily: 'OpenSans',fontSize: 15,color: Colors.black),),
                        ),
                      ),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 50,vertical: 8),child: Row(
                  children: [
                    Text('Select Country code', style: TextStyle(fontFamily: 'OpenSans',fontSize: 15,color: Colors.white),),
                    SizedBox(width: 20,),
                    CountryCodePicker(
                      textStyle: TextStyle(fontFamily: 'OpenSans',fontSize: 15,color: Colors.white),
                      onChanged: (val){
                        print(val.name);
                        print(val.code);
                        cc=val.code;
                        print(val.dialCode);
                        print(val.toCountryStringOnly());
                        print(val.toLongString());
                        setState(() {
                          // cc=val;
                        });
                      },
                      // Initial selection and favorite can be one of code ('IT') OR dial_code('+39')
                      initialSelection: 'IN',
                      favorite: ['+91','FR'],
                      // optional. Shows only country name and flag
                      showCountryOnly: false,
                      // optional. Shows only country name and flag when popup is closed.
                      showOnlyCountryWhenClosed: false,
                      // optional. aligns the flag and the Text left
                      alignLeft: false,
                    ),
                  ],
                ),
                ),
                SizedBox(height: 30,),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 50,vertical: 8),
                  child: InkWell(
                    onTap: ()async{
                      await makeRequest();
                    },
                    child: Material(
                      borderRadius: BorderRadius.circular(7),
                      shadowColor: Color(0x40000000),
                      child: Container(
                        width: MediaQuery.of(context).size.width,
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(color: Color(0x40000000),blurRadius: 4)
                          ],
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(7),
                        ),
                        child: Center(child: Padding(
                          padding: const EdgeInsets.symmetric(vertical: 10),
                          child: Text('Complete KYC',style: TextStyle(color: primaryColor,fontWeight: FontWeight.bold,fontFamily: 'OpenSansSemi',fontSize: 20),),
                        )),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
