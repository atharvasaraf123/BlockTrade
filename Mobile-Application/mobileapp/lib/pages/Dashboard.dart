import 'dart:convert';
import 'package:mobileapp/konstants/strings.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart';
import 'package:mobileapp/konstants/API.dart';
import 'package:mobileapp/konstants/colors.dart';
import 'package:mobileapp/konstants/loader.dart';
import 'SideNav.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:percent_indicator/circular_percent_indicator.dart';
import 'package:percent_indicator/linear_percent_indicator.dart';
import 'login.dart';
import 'package:intl/intl.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:currency_pickers/countries.dart';
import 'package:currency_pickers/country.dart';
import 'package:fluttertoast/fluttertoast.dart';
class Dashboard extends StatefulWidget {
  @override
  _DashboardState createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {


  String accToken;



  Client httpClient;
  Web3Client ethClient;


  final storage = FlutterSecureStorage();
  bool load = true;
  String name;
  String username;
  String email;
  bool importer=false;
  bool exporter=false;
  List trades;
  Country country;
  List completedTrades;
  String walletAddress;



  dialog(List steps) {
    showDialog(
        context: context,
        builder: (context) {
          return StatefulBuilder(
            builder: (context,setState) {
              return Center(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Container(
                    height: 450,
                    child: Center(
                      child: Scaffold(
                        body: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            // Center(
                            //     child: Text(
                            //   'Define your role',
                            //   style: TextStyle(
                            //       color: Colors.black,
                            //       fontFamily: 'OpenSansSemi',
                            //       fontSize: 16),
                            //   textAlign: TextAlign.center,
                            // )),
                            // SizedBox(height: 30,),
                            // Row(
                            //   mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                            //   children: [
                            //     GestureDetector(
                            //       onTap: (){
                            //         setState(() {
                            //           importer=true;
                            //           exporter=false;
                            //         });
                            //       },
                            //       child: Column(
                            //         mainAxisAlignment: MainAxisAlignment.center,
                            //         children: [
                            //           Material(
                            //               child: Image.asset('assets/images/importer.png'),
                            //           // shadowColor: importer?primaryColor:null,
                            //           shape: CircleBorder(),
                            //           elevation: importer?10:0,),
                            //           SizedBox(height: 10,),
                            //           Text(
                            //             'Importer',
                            //             style: importer?TextStyle(
                            //                 color: primaryColor,
                            //                 fontFamily: 'OpenSans',
                            //                 fontWeight: FontWeight.bold,
                            //                 fontSize: 16):TextStyle(
                            //                 color: Colors.black,
                            //                 fontFamily: 'OpenSansSemi',
                            //                 fontSize: 16),
                            //             textAlign: TextAlign.center,
                            //           ),
                            //         ],
                            //       ),
                            //     ),
                            //     GestureDetector(
                            //       onTap: (){
                            //         setState(() {
                            //           exporter=true;
                            //           importer=false;
                            //         });
                            //       },
                            //       child: Column(
                            //         mainAxisAlignment: MainAxisAlignment.center,
                            //         children: [
                            //           Material(child: Image.asset('assets/images/exporter.png'),
                            //             // shadowColor: exporter?primaryColor:null,
                            //             shape: CircleBorder(),
                            //             elevation: exporter?10:0,),
                            //           SizedBox(height: 10,),
                            //           Text(
                            //             'Exporter',
                            //             style: exporter?TextStyle(
                            //                 color: primaryColor,
                            //                 fontFamily: 'OpenSans',
                            //                 fontWeight: FontWeight.bold,
                            //                 fontSize: 16):TextStyle(
                            //                 color: Colors.black,
                            //                 fontFamily: 'OpenSansSemi',
                            //                 fontSize: 16),
                            //             textAlign: TextAlign.center,
                            //           ),
                            //         ],
                            //       ),
                            //     ),
                            //   ],
                            // ),
                            // SizedBox(height: 20,),
                            // GestureDetector(
                            //   onTap: (){
                            //     Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)=>SearchConsignee()));
                            //   },
                            //   child: Center(
                            //       child: Container(
                            //         decoration: BoxDecoration(
                            //           color: primaryColor,
                            //           borderRadius: BorderRadius.circular(22),
                            //         ),
                            //         child: Padding(
                            //           padding: const EdgeInsets.symmetric(horizontal: 20,vertical: 10),
                            //           child: Text(
                            //             'Next',
                            //             style: TextStyle(
                            //                 color: Colors.white,
                            //                 fontFamily: 'OpenSansSemi',
                            //                 fontSize: 18),
                            //             textAlign: TextAlign.center,
                            //           ),
                            //         ),
                            //       )),
                            // ),
                            Stepper(
                              controlsBuilder: null,
                              onStepCancel: null,
                              onStepContinue: null,
                              currentStep: 0,
                              type: StepperType.vertical,
                              steps: steps,
                            )
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              );
            },
          );
        });
  }

  showDialog1(BuildContext context,String tradeID,int amount,String usernam) {
    showDialog(
        context: context,
        builder: (BuildContext context) {
          return StatefulBuilder(builder: (BuildContext context, void Function(void Function()) setState) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Container(
                    height: 120.0,
                    child: Center(
                      child: Scaffold(
                        body: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: <Widget>[
                            Container(
                              child: Padding(
                                padding: const EdgeInsets.only(
                                    top: 30, left: 8, right: 8),
                                child: Text(
                                  'Have you viewed the trade document?',
                                  style: TextStyle(
                                      fontSize: 14,
                                      fontFamily: 'OpenSans',
                                      fontWeight: FontWeight.bold,
                                      color: Color.fromRGBO(48, 48, 48, 1)),
                                  textAlign: TextAlign.center,
                                ),
                              ),
                            ),
                            Spacer(),
                            Padding(
                              padding: const EdgeInsets.only(top: 8),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                                children: <Widget>[
                                  Expanded(
                                    child: GestureDetector(
                                      onTap: ()async{
                                        print("abcd$tradeID");
                                        var result=await query('getTrade', ["iA5tUKtSZ0+6u0qA/VdjE8Oi/PDEa3vZ87lw+M7quF8="]);
                                        print('abc');
                                        String link="https://ipfs.infura.io/ipfs/";
                                        link=link+result[0].toString();
                                        print("wtf$link");
                                        if (await canLaunch(link)) {
                                          await launch(link);
                                        } else {
                                          Fluttertoast.showToast(msg: 'Please try again later');
                                        }
                                      },
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: Color(0xFFF4F4F4),
                                          borderRadius: BorderRadius.only(
                                              bottomLeft: Radius.circular(5.0)),
                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.all(12.0),
                                          child: Center(
                                            child: Text(
                                              'NO',
                                              style: TextStyle(
                                                color: primaryColor,
                                                fontSize: 14,
                                                fontFamily: 'OpenSans',
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                  Expanded(
                                    child: GestureDetector(
                                      onTap: () async {
                                        Map<String, String> headers = {"token": "$accToken","Content-Type":"application/json"};
                                        String body='{"username":"$usernam"}';
                                        http.Response response=await http.post(verifyUrl,headers: headers,body: body);
                                        if(response.statusCode==200){
                                          String wallet=jsonDecode(response.body)['walletAddr'];
                                          List<dynamic>result=await query('transfer30', [amount,"$tradeID","$wallet"]);
                                          String body='{"tradeId":"$tradeID","tradeStatus":"IV"}';
                                          Map<String,String>header={
                                            "Content-Type":"application/json",
                                            "token":"$accToken"
                                          };
                                          http.Response response1=await http.post(updateTradeStatus,body: body,headers: header);
                                          print(response1.statusCode);
                                          print(body);
                                          print(header);
                                          print(response1.body);
                                          if(response.statusCode==200) {
                                            Navigator.pop(context);
                                            setState(() {
                                              load = true;
                                            });
                                            await makeRequest();
                                            Fluttertoast.showToast(
                                                msg: "Documents verified",
                                                textColor: Colors.white,
                                                backgroundColor: Colors.black);
                                          }
                                        }
                                        // Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (BuildContext context)=>MyHomePage()), (route) => false);
//                            await storage.deleteAll();
//                            Navigator.pushAndRemoveUntil(
//                                context,
//                                MaterialPageRoute(
//                                    builder: (BuildContext context) => Home()),
//                                    (Route<dynamic> route) => false);
                                      },
                                      child: Container(
                                        decoration: BoxDecoration(
                                          color: primaryColor,
                                          borderRadius: BorderRadius.only(
                                              bottomRight: Radius.circular(5.0)),
                                        ),
                                        child: Padding(
                                          padding: const EdgeInsets.all(12.0),
                                          child: Center(
                                            child: Text(
                                              'YES',
                                              style: TextStyle(
                                                color: Color(0xFFF0F0F0),
                                                fontSize: 14,
                                                fontFamily: 'OpenSans',
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            )
                          ],
                        ),
                      ),
                    )),
              ),
            );
          },
          );
        });
  }



  makeRequest() async {
    String url = loginUrl;
    accToken = await storage.read(key: 'accToken');
    print(accToken);
    Map<String, String> headers = {"token": "$accToken"};

    http.Response response = await http.get(url, headers: headers);
    if (response.statusCode == 200) {
      var decodedResponse = jsonDecode(response.body);
      setState(() {
        email = decodedResponse['email'];
        username = decodedResponse['username'];
        walletAddress=decodedResponse['walletAddr'];
      });
      name=decodedResponse['name'];
      await storage.write(key: 'username', value: username);
      await storage.write(key: 'email', value: email);
      await storage.write(key: 'name', value: name);
      await storage.write(key: 'walletAddress', value: walletAddress);
      String tradeurl = tradeUrl;
      http.Response response1 = await http.get(tradeurl, headers: headers);
      if (response1.statusCode == 200) {
        trades=List();
        completedTrades=List();

        List list=jsonDecode(response1.body)['trades'] as List;
        for(int i=0;i<list.length;i++){
          if(list[i]['tradeStatus']=='PD'){
            completedTrades.add(list[i]);
          }else if(list[i]['tradeStatus']=='CT'){}
          else{
            trades.add(list[i]);
          }
        }
        print(trades.length);
        print(accToken);
        setState(() {
          load = false;
        });
      } else {
        Navigator.pushAndRemoveUntil(
            context,
            MaterialPageRoute(builder: (BuildContext context) => Login()),
                (route) => false);
      }
    } else {
      Navigator.pushAndRemoveUntil(
          context,
          MaterialPageRoute(builder: (BuildContext context) => Login()),
              (route) => false);
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    // httpClient=Client();
    // ethClient=Web3Client('https://kovan.infura.io/v3/8c9a59272cd54f8884ea7af3ff8a7e16',httpClient);
    makeRequest();
  }

  Future<DeployedContract>loadContract()async{
    String abi=await rootBundle.loadString("assets/abis/trades.json");
    String contractAddress="0xf3a79d156df1afe7dd65d6d2b5c6e76df9b75071";
    final contract=DeployedContract(ContractAbi.fromJson(abi, "Trades"),EthereumAddress.fromHex(contractAddress));
    return contract;
  }
  Future<List<dynamic>>query(String funcName,List<dynamic>args)async{
    final contract=await loadContract();
    final ethFunction=contract.function(funcName);
    final result=await ethClient.call(contract: contract, function: ethFunction, params: args);
    return result;
  }


  @override
  Widget build(BuildContext context) {
    return load == true
        ? Container(
      child: spinkit,
      color: Colors.white,
    )
        : trades.length==0?Scaffold(
      appBar: AppBar(
        actions: [
          IconButton(
            icon: CircleAvatar(
              child: Icon(
                Icons.person,
                color: primaryColor,
              ),
              backgroundColor: Colors.white,
              radius: 12,
            ),
            onPressed: () {},
          )
        ],
        centerTitle: true,
        title: Text(
          'Dashboard',
          style:
          TextStyle(color: Colors.white, fontFamily: 'OpenSansSemi'),
        ),
        backgroundColor: primaryColor,
      ),
      drawer: SideNavDrawer(
        a: 1,
        email: email,
        username: username,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Center(child: Image.asset('assets/images/dashboardimage.png')),
          Text(
            'No trade history yet!',
            style: TextStyle(
                color: Colors.black,
                fontFamily: 'OpenSans',
                fontSize: 16),
          ),
          SizedBox(
            height: 30,
          ),
          InkWell(
            onTap: () {
              // dialog();
              Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)=>SearchConsignee()));

            },
            child: Material(
              // elevation: 10,
              shadowColor: Color(0x26000000),
              child: Container(
                width: 170,
                decoration: BoxDecoration(
                  boxShadow: [
                    BoxShadow(color: Color(0x26000000), blurRadius: 4)
                  ],
                  color: primaryColor,
                  borderRadius: BorderRadius.circular(22),
                ),
                child: Center(
                  // child: ListTile(
                  //   leading: Icon(Icons.add,color: Colors.white,),
                  //   title: Text('New Trade',style: TextStyle(color: Colors.white,fontFamily: 'OpenSans'),),
                  // ),
                  child: Padding(
                    padding: const EdgeInsets.all(15.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.add,
                          color: Colors.white,
                        ),
                        SizedBox(
                          width: 10,
                        ),
                        Text(
                          'New Trade',
                          style: TextStyle(
                              color: Colors.white,
                              fontFamily: 'OpenSansSemi',
                              fontSize: 18),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          )
        ],
      ),
    ):Scaffold(
      appBar:  AppBar(
        actions: [
          IconButton(
            icon: CircleAvatar(
              child: Icon(
                Icons.person,
                color: primaryColor,
              ),
              backgroundColor: Colors.white,
              radius: 12,
            ),
            onPressed: () {
              // Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)=>UserProfile()));
            },
          )
        ],
        centerTitle: true,
        title: Text(
          'Dashboard',
          style:
          TextStyle(color: Colors.white, fontFamily: 'OpenSansSemi'),
        ),
        backgroundColor: primaryColor,
      ),
      drawer: SideNavDrawer(
        a: 1,
        email: email,
        username: username,
      ),
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            children: [
              Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.only(left: 20,top: 20),
                    child: Align(child: Text('Ongoing Trades',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 18),),alignment: Alignment.topLeft,),
                  ),
                  SizedBox(height: 20,),
                  Padding(
                    padding: const EdgeInsets.all(5.0),
                    child: Container(
                      height: 370,
                      child: PageView.builder(
                        pageSnapping: true,
                        itemBuilder: (BuildContext context,int pos){
                          // country=Country(currencyCode: trades[pos]['amount'].toString().substring(0,3));
                          // print(trades[pos]['amount'].toString().substring(0,3));
                          // print(country.name);
                          return Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 10,vertical: 10),
                            child: Container(decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(12),
                                gradient: LinearGradient(
                                  colors: [
                                    Color(0xFF18bef1),
                                    Color(0xFF128bfc),
                                    Color(0xFF2d5fc3)
                                  ],
                                )
                            ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  // Padding(
                                  //   padding: const EdgeInsets.only(left: 8,top: 20,right: 8,bottom: 5),
                                  //   child: LinearPercentIndicator(
                                  //     // maskFilter: MaskFilter.blur(_style, _sigma),
                                  //     // width: MediaQuery.of(context
                                  //
                                  //     // ).size.width-50,
                                  //     restartAnimation: true,
                                  //     animation: true,
                                  //     animationDuration: 1000,
                                  //     lineHeight: 5.0,
                                  //     // trailing: Text(fulForm[trades[pos]['tradeStatus']],style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                  //     // trailing: new Text("right content"),
                                  //     percent: 0.2,
                                  //     // center: Text("20.0%",style: TextStyle(color: Colors.red),),
                                  //     linearStrokeCap: LinearStrokeCap.round,
                                  //     progressColor: primaryColor,
                                  //   ),
                                  // ),
                                  // Padding(
                                  //   padding: const EdgeInsets.all(8.0),
                                  //   child: Align(child: Text(
                                  //     "Status : ${
                                  //                     fulForm[trades[pos]
                                  //                         ['tradeStatus']]
                                  //                   }",style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),alignment: Alignment.bottomRight,),
                                  // ),
                                  // Divider(color: Colors.grey.shade500,),
                                  Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Row(
                                      children: [
                                        Column(
                                          children: [
                                            Image.asset('assets/images/exporter.png',height: 100,width: 100,),
                                            SizedBox(height: 20,),
                                            Text(username==trades[pos]['importerUserName']?trades[pos]['exporterUserName'].toString():trades[pos]['importerUserName'].toString(),style: TextStyle(color: Colors.white, fontFamily: 'OpenSans',fontSize: 14),),
                                          ],
                                        ),
                                        Expanded(
                                          child: Table(
                                            columnWidths: {
                                              0:FlexColumnWidth(1),
                                              1:FlexColumnWidth(2),
                                            },
                                            children: [
                                              TableRow(
                                                  children: [
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text('Trade ID',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),

                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text(trades[pos]['TradeId'],overflow: TextOverflow.ellipsis,style: TextStyle(color: Colors.white, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                  ]
                                              ),
                                              TableRow(
                                                  children: [
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text('Status',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text(fulForm[trades[pos]
                                                      ['tradeStatus']],overflow: TextOverflow.ellipsis,style: TextStyle(color: Colors.white, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                  ]
                                              ),
                                              TableRow(
                                                  children: [
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text('Invoice Date',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text(DateFormat.yMMMEd().format(DateFormat('yyyy/MM/dd').parse(trades[pos]
                                                      ['invoiceDate'])),overflow: TextOverflow.ellipsis,style: TextStyle(color: Colors.white, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                  ]
                                              ),
                                              TableRow(
                                                  children: [
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text('Amount',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text('${trades[pos]
                                                      ['amount']
                                                      }',style: TextStyle(color: Colors.white, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                  ]
                                              ),
                                              TableRow(
                                                  children: [
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text('Payment Type',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text(trades[pos]
                                                      ['paymentType'],style: TextStyle(color: Colors.white, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                  ]
                                              ),
                                              trades[pos]
                                              ['paymentType']=='PA'?TableRow(
                                                  children: [
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text('Credit Period',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text("${trades[pos]['creditPeriod']}",style: TextStyle(color: Colors.white, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                  ]
                                              ):TableRow(children: [Container(),Container()])
                                              // TableRow(
                                              //     children: [
                                              //       Padding(
                                              //         padding: const EdgeInsets.all(8.0),
                                              //         child: Text('Amount',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                              //       ),
                                              //       Padding(
                                              //         padding: const EdgeInsets.all(8.0),
                                              //         child: Text((trades[pos]
                                              //         ['amount']),overflow: TextOverflow.ellipsis,style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                              //       ),
                                              //     ]
                                              // ),
                                            ],
                                          ),
                                        )
                                      ],
                                    ),
                                  ),
                                  Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Row(
                                      children: [
                                        GestureDetector(
                                          child: Padding(
                                            padding: const EdgeInsets.all(8.0),
                                            child: Align(child: Container(width:110,child: Padding(
                                              padding: const EdgeInsets.all(8.0),
                                              child: Center(child: Text('Check Status',style: TextStyle(color: primaryColor, fontFamily: 'OpenSansSemi',fontSize: 14),),),
                                            ),decoration: BoxDecoration(color: Colors.white,borderRadius: BorderRadius.circular(7)),),alignment: Alignment.bottomRight,),
                                          ),
                                          onTap: (){
                                            List<Step>steps=List();
                                            int j=shortForm.indexOf(trades[pos]['tradeStatus']);
                                            for(int i=0;i<=j;i++){
                                              steps.add( Step(title: Text(fulForm[shortForm[i]]),
                                                  content: Text('abc'),
                                                  state: StepState.complete,
                                                  isActive: true
                                              ));
                                            }
                                            for(int i=j+1;i<6;i++){
                                              steps.add( Step(title: Text(fulForm[shortForm[i]]),
                                                content: Text('abc'),
                                                state: StepState.indexed,
                                              ));
                                            }
                                            dialog(steps);
                                          },
                                        ),
                                        trades[pos]['tradeStatus']=='DU'&&username==trades[pos]['importerUserName']?GestureDetector(
                                          child: Padding(
                                            padding: const EdgeInsets.all(8.0),
                                            child: Align(child: Container(width:140,child: Padding(
                                              padding: const EdgeInsets.all(8.0),
                                              child: Center(child: Text('Verify Documents',style: TextStyle(color: primaryColor, fontFamily: 'OpenSansSemi',fontSize: 14),),),
                                            ),decoration: BoxDecoration(color: Colors.white,borderRadius: BorderRadius.circular(7)),),alignment: Alignment.bottomRight,),
                                          ),
                                          onTap: ()async{
                                            // List<dynamic>result=await query('getTrade', ["eU0hlwXZtG85gPrwT3ZhY6w1eqhCUmQgXkNbV/2QtOQ="]);
                                            // print(result[0]);
                                            // String link="https://ipfs.infura.io/ipfs/";
                                            // link=link+result[0].toString();
                                            // print(link);
                                            await showDialog1(context,trades[pos]['TradeId'],trades[pos]['amount'],trades[pos]['exporterUserName']);
                                          },
                                        ):Container(),
                                        trades[pos]['tradeStatus']=='DV'&&username==trades[pos]['exporterUserName']?GestureDetector(
                                            child: Padding(
                                              padding: const EdgeInsets.all(8.0),
                                              child: Align(child: Container(width:140,child: Padding(
                                                padding: const EdgeInsets.all(8.0),
                                                child: Center(child: Text('Goods Laided?',style: TextStyle(color: primaryColor, fontFamily: 'OpenSansSemi',fontSize: 14),),),
                                              ),decoration: BoxDecoration(color: Colors.white,borderRadius: BorderRadius.circular(7)),),alignment: Alignment.bottomRight,),
                                            ),
                                            onTap: ()async{
                                              String body='{"tradeId":"${trades[pos]['TradeId']}","tradeStatus":"GL"}';
                                              Map<String,String>header={
                                                "Content-Type":"application/json",
                                                "token":"$accToken"
                                              };
                                              http.Response response=await http.post(updateTradeStatus,body: body,headers: header);
                                              print(response.statusCode);
                                              print(body);
                                              print(header);
                                              print(response.body);
                                              if(response.statusCode==200){
                                                setState(() {
                                                  load = true;
                                                });
                                                await makeRequest();
                                                Fluttertoast.showToast(msg: "Goods Laided",textColor: Colors.white,backgroundColor: Colors.black);
                                              }
                                            }
                                        ):Container(),
                                        trades[pos]['tradeStatus']=='GL'&&username==trades[pos]['importerUserName']?GestureDetector(
                                            child: Padding(
                                              padding: const EdgeInsets.all(8.0),
                                              child: Align(child: Container(width:140,child: Padding(
                                                padding: const EdgeInsets.all(8.0),
                                                child: Center(child: Text('Goods Delivered?',style: TextStyle(color: primaryColor, fontFamily: 'OpenSansSemi',fontSize: 14),),),
                                              ),decoration: BoxDecoration(color: Colors.white,borderRadius: BorderRadius.circular(7)),),alignment: Alignment.bottomRight,),
                                            ),
                                            onTap: ()async{
                                              String body='{"tradeId":"${trades[pos]['TradeId']}","tradeStatus":"GD"}';
                                              Map<String,String>header={
                                                "Content-Type":"application/json",
                                                "token":"$accToken"
                                              };
                                              http.Response response=await http.post(updateTradeStatus,body: body,headers: header);
                                              print(response.statusCode);
                                              print(body);
                                              print(header);
                                              print(response.body);
                                              if(response.statusCode==200){
                                                setState(() {
                                                  load = true;
                                                });
                                                await makeRequest();
                                                Fluttertoast.showToast(msg: "Goods Delivered",textColor: Colors.white,backgroundColor: Colors.black);
                                              }
                                            }
                                        ):Container(),
                                        trades[pos]['tradeStatus']=='GD'&&username==trades[pos]['importerUserName']?GestureDetector(
                                          child: Padding(
                                            padding: const EdgeInsets.all(8.0),
                                            child: Align(child: Container(width:140,child: Padding(
                                              padding: const EdgeInsets.all(8.0),
                                              child: Center(child: Text('Pay',style: TextStyle(color: primaryColor, fontFamily: 'OpenSansSemi',fontSize: 14),),),
                                            ),decoration: BoxDecoration(color: Colors.white,borderRadius: BorderRadius.circular(7)),),alignment: Alignment.bottomRight,),
                                          ),
                                          onTap: ()async{
                                          },
                                        ):Container(),
                                      ],
                                    ),
                                  )
                                ],
                              ),
                            ),
                          );
                        },
                        itemCount: trades.length,
                        // pageSnapping: false,
                      ),
                    ),
                  ),
                  SizedBox(height: 30,),
                  completedTrades.length==0?Container(): Padding(
                    padding: const EdgeInsets.only(left: 20),
                    child: Align(child: Text('Completed Trades',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 18),),alignment: Alignment.topLeft,),
                  ),
                  completedTrades.length==0?Container():SizedBox(height: 20,),
                  completedTrades.length==0?Container():Padding(
                    padding: const EdgeInsets.all(5.0),
                    child: Container(
                      height: 250,
                      child: PageView.builder(
                        pageSnapping: true,
                        itemBuilder: (BuildContext context,int pos){
                          country=Country(currencyCode: completedTrades[pos]['amount'].toString().substring(0,3));
                          print(completedTrades[pos]['amount'].toString().substring(0,3));
                          print(country.name);
                          return Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 10),
                            child: Container(decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(12),
                                gradient: LinearGradient(
                                  begin: Alignment.topCenter,
                                  end: Alignment.bottomCenter,
                                  colors: [
                                    Colors.white,
                                    Color(0xFF3799F3),
                                  ],
                                )
                            ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: [
                                  // Padding(
                                  //   padding: const EdgeInsets.only(left: 8,top: 20,right: 8,bottom: 5),
                                  //   child: LinearPercentIndicator(
                                  //     // maskFilter: MaskFilter.blur(_style, _sigma),
                                  //     // width: MediaQuery.of(context
                                  //
                                  //     // ).size.width-50,
                                  //     restartAnimation: true,
                                  //     animation: true,
                                  //     animationDuration: 1000,
                                  //     lineHeight: 5.0,
                                  //     // trailing: Text(fulForm[trades[pos]['tradeStatus']],style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                  //     // trailing: new Text("right content"),
                                  //     percent: 0.2,
                                  //     // center: Text("20.0%",style: TextStyle(color: Colors.red),),
                                  //     linearStrokeCap: LinearStrokeCap.round,
                                  //     progressColor: primaryColor,
                                  //   ),
                                  // ),
                                  // Padding(
                                  //   padding: const EdgeInsets.all(8.0),
                                  //   child: Align(child: Text(
                                  //     "Status : ${
                                  //         fulForm[completedTrades[pos]
                                  //         ['tradeStatus']]
                                  //     }",style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),alignment: Alignment.bottomRight,),
                                  // ),
                                  // Divider(color: Colors.grey.shade500,),
                                  Padding(
                                    padding: const EdgeInsets.all(8.0),
                                    child: Row(
                                      children: [
                                        Column(
                                          children: [
                                            Image.asset('assets/images/exporter.png',height: 100,width: 100,),
                                            SizedBox(height: 10,),
                                            Text(username==completedTrades[pos]['importerUserName']?completedTrades[pos]['exporterUserName'].toString().toUpperCase():completedTrades[pos]['importerUserName'].toString().toUpperCase(),style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                          ],
                                        ),
                                        Expanded(
                                          child: Table(
                                            columnWidths: {
                                              0:FlexColumnWidth(1),
                                              1:FlexColumnWidth(2),
                                            },
                                            children: [
                                              TableRow(
                                                  children: [
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text('Trade ID',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),

                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text(completedTrades[pos]['TradeId'],overflow: TextOverflow.ellipsis,style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                  ]
                                              ),
                                              TableRow(
                                                  children: [
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text('Status',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text(completedTrades[pos]
                                                      ['tradeStatus'],overflow: TextOverflow.ellipsis,style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                  ]
                                              ),
                                              TableRow(
                                                  children: [
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text('Invoice Date',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                    Padding(
                                                      padding: const EdgeInsets.all(8.0),
                                                      child: Text(DateFormat.yMMMEd().format(DateTime.parse(completedTrades[pos]
                                                      ['invoiceDate'])),overflow: TextOverflow.ellipsis,style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                                    ),
                                                  ]
                                              ),
                                              // TableRow(
                                              //     children: [
                                              //       Padding(
                                              //         padding: const EdgeInsets.all(8.0),
                                              //         child: Text('Amount',style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                              //       ),
                                              //       Padding(
                                              //         padding: const EdgeInsets.all(8.0),
                                              //         child: Text((trades[pos]
                                              //         ['amount']),overflow: TextOverflow.ellipsis,style: TextStyle(color: Colors.black, fontFamily: 'OpenSansSemi',fontSize: 14),),
                                              //       ),
                                              //     ]
                                              // ),
                                            ],
                                          ),
                                        )
                                      ],
                                    ),
                                  )
                                ],
                              ),
                            ),
                          );
                        },
                        itemCount: completedTrades.length,
                        // pageSnapping: false,
                      ),
                    ),
                  ),
                  InkWell(
                    onTap: () {
                      // dialog();
                      Navigator.push(context, MaterialPageRoute(builder: (BuildContext context)=>SearchConsignee()));

                    },
                    child: Material(
                      // elevation: 10,
                      shadowColor: Color(0x26000000),
                      child: Container(
                        width: 170,
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(color: Color(0x26000000), blurRadius: 4)
                          ],
                          color: primaryColor,
                          borderRadius: BorderRadius.circular(22),
                        ),
                        child: Center(
                          // child: ListTile(
                          //   leading: Icon(Icons.add,color: Colors.white,),
                          //   title: Text('New Trade',style: TextStyle(color: Colors.white,fontFamily: 'OpenSans'),),
                          // ),
                          child: Padding(
                            padding: const EdgeInsets.all(15.0),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  Icons.add,
                                  color: Colors.white,
                                ),
                                SizedBox(
                                  width: 10,
                                ),
                                Text(
                                  'New Trade',
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontFamily: 'OpenSansSemi',
                                      fontSize: 18),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    ),
                  )
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
