
import 'package:flutter/material.dart';
import 'package:mobileapp/konstants/colors.dart';

import 'Dashboard.dart';

class KycVerifiedScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryColor,
      body: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Text('Hurray!\nWelcome to the BlockTrade Family!',style: TextStyle(fontSize: 15,fontFamily: 'OpenSansSemi',color: Colors.white),textAlign: TextAlign.start,),
            Image.asset('assets/images/KycVerified.png'),
            Align(
              alignment: Alignment.bottomRight,
              child: Padding(
                padding: const EdgeInsets.only(right: 30),
                child: InkWell(
                  onTap: (){
                    Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (BuildContext context)=>Dashboard()), (route) => false);
                  },
                  child: Material(
                    borderRadius: BorderRadius.circular(7),
                    shadowColor: Color(0x40000000),
                    child: Container(
                      width: 150,
                      decoration: BoxDecoration(
                        boxShadow: [
                          BoxShadow(color: Color(0x40000000),blurRadius: 4)
                        ],
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(7),
                      ),
                      child: Center(child: Padding(
                        padding: const EdgeInsets.symmetric(vertical: 10),
                        child: Text('Get Started',style: TextStyle(color: primaryColor,fontWeight: FontWeight.bold,fontFamily: 'OpenSansSemi',fontSize: 20),),
                      )),
                    ),
                  ),
                ),
              ),
            ),
          ]
      ),
    );
  }
}
