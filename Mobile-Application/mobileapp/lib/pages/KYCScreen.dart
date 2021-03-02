import 'package:flutter/material.dart';
import 'package:mobileapp/konstants/colors.dart';

import 'DLKycScreen.dart';
import 'PassportKycScreen.dart';

class KYCScreen extends StatefulWidget {
  @override
  _KYCScreenState createState() => _KYCScreenState();
}

class _KYCScreenState extends State<KYCScreen> {
  @override
  Widget build(BuildContext context) {
    return  SafeArea(
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
                  padding: const EdgeInsets.symmetric(horizontal: 30,vertical: 8),
                  child: InkWell(
                    onTap: (){
                      Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)=>DLKycScreen()));
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
                          child: Text('KYC using DL',style: TextStyle(color: primaryColor,fontWeight: FontWeight.bold,fontFamily: 'OpenSansSemi',fontSize: 20),),
                        )),
                      ),
                    ),
                  ),
                ),
                Row(
                  children: [
                    Expanded(
                      flex: 1,
                      child: Container(
                        color: Colors.white,
                        height: 2,
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text('OR',style: TextStyle(fontSize: 14,fontFamily: 'OpenSans',color: Colors.white),),
                    ),
                    Expanded(
                      flex: 1,
                      child: Container(
                        color: Colors.white,
                        height: 2,
                      ),
                    ),
                  ],
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 30,vertical: 8),
                  child: InkWell(
                    onTap: (){
                      Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)=>PassportKycScreen()));

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
                          child: Text('KYC using Passport',style: TextStyle(color: primaryColor,fontWeight: FontWeight.bold,fontFamily: 'OpenSansSemi',fontSize: 20),),
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
