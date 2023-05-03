{\rtf1\ansi\ansicpg1252\cocoartf2708
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 Menlo-Regular;}
{\colortbl;\red255\green255\blue255;\red70\green137\blue204;\red26\green26\blue41;\red172\green172\blue193;
\red212\green212\blue212;\red167\green197\blue152;\red140\green108\blue11;\red45\green175\blue118;\red31\green133\blue64;
\red79\green123\blue61;\red237\green114\blue173;\red76\green167\blue134;\red13\green102\blue149;\red194\green126\blue101;
\red14\green86\blue166;\red253\green181\blue13;}
{\*\expandedcolortbl;;\cssrgb\c33725\c61176\c83922;\cssrgb\c13333\c13725\c21176;\cssrgb\c72941\c73333\c80000;
\cssrgb\c86275\c86275\c86275;\cssrgb\c70980\c80784\c65882;\cssrgb\c61961\c49412\c3137;\cssrgb\c19608\c72941\c53725;\cssrgb\c12941\c58039\c31765;
\cssrgb\c37647\c54510\c30588;\cssrgb\c95294\c54118\c73333;\cssrgb\c35686\c70588\c59608;\cssrgb\c0\c47843\c65098;\cssrgb\c80784\c56863\c47059;
\cssrgb\c3137\c42353\c70980;\cssrgb\c100000\c75686\c2745;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \cb3 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 pragma\cf4 \strokec4  \cf2 \strokec2 solidity\cf4 \strokec4  \cf5 \strokec5 >=\cf6 \strokec6 0.4.22\cf4 \strokec4  \cf5 \strokec5 <\cf6 \strokec6 0.6.0\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3 interface RealNFT  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3     \cb1 \
\cb3     \cf2 \strokec2 function\cf4 \strokec4  mintNftByContract\cf5 \strokec5 (\cf2 \strokec2 address\cf4 \strokec4  receiver\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 string\cf4 \strokec4  \cf7 \strokec7 calldata\cf4 \strokec4  tokenURI\cf5 \strokec5 )\cf4 \strokec4   \cf8 \strokec8 external\cf4 \strokec4   \cf9 \strokec9 returns\cf4 \strokec4  \cf5 \strokec5 (\cf2 \strokec2 uint256\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 \}\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf2 \cb3 \strokec2 contract\cf4 \strokec4  PropertyRentalContract \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\
\pard\pardeftab720\partightenfactor0
\cf4 \cb3     \cf2 \strokec2 struct\cf4 \strokec4  Property \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 uint\cf4 \strokec4  id\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 string\cf4 \strokec4  name\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // name of the property\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 string\cf4 \strokec4  addr\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // address of the property\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 bool\cf4 \strokec4  rented\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // rent status of the property\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 uint\cf4 \strokec4  rentInterval\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // interval in days for the rent amount\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 uint\cf4 \strokec4  rentAmount\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // property rent value\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 uint\cf4 \strokec4  tenantWarning\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // tracks the count for warning given to tenant\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 uint\cf4 \strokec4  warningLimit\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // threshold limit for warning. Once exceeded tenant can be dismissed.\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 uint\cf4 \strokec4  dueDate\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // unix timestamp for the dueDate.\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 address\cf4 \strokec4  tenant\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // tenant wallet address\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf2 \strokec2 struct\cf4 \strokec4  MonthlyRentStatus \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 uint\cf4 \strokec4  amount\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // Monthly rent amount to be paid.\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 uint\cf4 \strokec4  validationDate\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // unix timestamp at which the rent was paid.\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 bool\cf4 \strokec4  status\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // rent status.\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     Property property\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // instance of Property struct\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 address\cf4 \strokec4  \cf8 \strokec8 payable\cf4 \strokec4  \cf8 \strokec8 public\cf4 \strokec4  owner\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // wallet address of contract/property owner\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 uint\cf4 \strokec4  \cf8 \strokec8 private\cf4 \strokec4  warningTime \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 0\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // unix timestamp when the tenant gets warned.\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 uint256\cf4 \strokec4  \cf8 \strokec8 public\cf4 \strokec4  mintFee \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 0\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // Fee should be in wei\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 address\cf4 \strokec4  \cf8 \strokec8 payable\cf4 \strokec4  platformFeeReciever\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 mapping\cf5 \strokec5 (\cf2 \strokec2 string\cf4 \strokec4  => \cf2 \strokec2 bool\cf5 \strokec5 )\cf4 \strokec4  months\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 mapping\cf5 \strokec5 (\cf2 \strokec2 address\cf4 \strokec4  => \cf2 \strokec2 bool\cf5 \strokec5 )\cf4 \strokec4  \cf8 \strokec8 public\cf4 \strokec4  tenantRegistry\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // storage for users other than owner registered as a prospect.\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 mapping\cf5 \strokec5 (\cf2 \strokec2 string\cf4 \strokec4  => MonthlyRentStatus\cf5 \strokec5 )\cf4 \strokec4  rentInStore\cf5 \strokec5 ;\cf4 \strokec4  \cf10 \strokec10 // storage for rental status\cf4 \cb1 \strokec4 \
\
\cb3     RealNFT \cf8 \strokec8 public\cf4 \strokec4  realNft\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\
\cb3     \cf2 \strokec2 event\cf4 \strokec4  reg\cf5 \strokec5 (\cf2 \strokec2 address\cf4 \strokec4  _from\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 bool\cf4 \strokec4  _val\cf5 \strokec5 );\cf4 \strokec4  \cf10 \strokec10 // event when user regiters as a prospect\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 event\cf4 \strokec4  confirmed\cf5 \strokec5 (\cf2 \strokec2 address\cf4 \strokec4  _from\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 bool\cf4 \strokec4  _val\cf5 \strokec5 );\cf4 \strokec4  \cf10 \strokec10 // event when property gets set on rent.\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 event\cf4 \strokec4  rentPaid\cf5 \strokec5 (\cf2 \strokec2 string\cf4 \strokec4  _month\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 uint\cf4 \strokec4  _amount\cf5 \strokec5 );\cf4 \strokec4  \cf10 \strokec10 // event when the rent payment transaction is complete.\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 event\cf4 \strokec4  rentWithdrawn\cf5 \strokec5 (\cf2 \strokec2 string\cf4 \strokec4  _month\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 uint\cf4 \strokec4  _amount\cf5 \strokec5 );\cf4 \strokec4  \cf10 \strokec10 // event when rent is withdrawn from the contract.\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 event\cf4 \strokec4  tenantWarning\cf5 \strokec5 (\cf2 \strokec2 string\cf4 \strokec4  _month\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 uint\cf4 \strokec4  _warning\cf5 \strokec5 );\cf4 \strokec4  \cf10 \strokec10 // event to warn the tenant about pending payment.\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 event\cf4 \strokec4  dismissTenantConfirmed\cf5 \strokec5 (\cf2 \strokec2 bool\cf4 \strokec4  _confirmed\cf5 \strokec5 );\cf4 \strokec4  \cf10 \strokec10 // event to confirm the dismissal of tenant.\cf4 \cb1 \strokec4 \
\
\cb3     \cf11 \strokec11 constructor\cf5 \strokec5 (\cf2 \strokec2 string\cf4 \strokec4  \cf7 \strokec7 memory\cf4 \strokec4  name\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 string\cf4 \strokec4  \cf7 \strokec7 memory\cf4 \strokec4  addr\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 uint\cf4 \strokec4  rentInterval\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 uint\cf4 \strokec4  rentAmount\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 uint\cf4 \strokec4  warningLimit\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 address\cf4 \strokec4  _realNft\cf5 \strokec5 )\cf4 \strokec4  \cf8 \strokec8 public\cf4 \strokec4  \cf8 \strokec8 payable\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         realNft \cf5 \strokec5 =\cf4 \strokec4  RealNFT\cf5 \strokec5 (\cf4 \strokec4 _realNft\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         platformFeeReciever \cf5 \strokec5 =\cf4 \strokec4  \cf12 \strokec12 0x6983cB83052588AF94Cf9a937e664698e4E63490\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         mintFee \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 10000000000000000\cf4 \strokec4  \cf5 \strokec5 ;\cf10 \strokec10 // 0.01 ETH\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 uint256\cf4 \strokec4  propertyId \cf5 \strokec5 =\cf4 \strokec4  realNft\cf5 \strokec5 .\cf4 \strokec4 mintNftByContract\cf5 \strokec5 (\cf13 \strokec13 msg\cf5 \strokec5 .\cf4 \strokec4 sender\cf5 \strokec5 ,\cf4 \strokec4  \cf14 \strokec14 "sasa"\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         property \cf5 \strokec5 =\cf4 \strokec4  Property\cf5 \strokec5 (\{\cf4 \strokec4 id \cf5 \strokec5 :\cf4 \strokec4  propertyId\cf5 \strokec5 ,\cf4 \strokec4  name\cf5 \strokec5 :\cf4 \strokec4  name\cf5 \strokec5 ,\cf4 \strokec4  addr\cf5 \strokec5 :\cf4 \strokec4  addr\cf5 \strokec5 ,\cf4 \strokec4  rented\cf5 \strokec5 :\cf4 \strokec4  \cf2 \strokec2 false\cf5 \strokec5 ,\cf4 \strokec4  rentInterval\cf5 \strokec5 :\cf4 \strokec4  rentInterval\cf5 \strokec5 ,\cf4 \strokec4  rentAmount\cf5 \strokec5 :\cf4 \strokec4  rentAmount\cf5 \strokec5 ,\cf4 \cb1 \strokec4 \
\cb3         warningLimit\cf5 \strokec5 :\cf4 \strokec4  warningLimit\cf5 \strokec5 ,\cf4 \strokec4  tenantWarning\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 0\cf5 \strokec5 ,\cf4 \strokec4  dueDate\cf5 \strokec5 :\cf4 \strokec4  \cf6 \strokec6 0\cf5 \strokec5 ,\cf4 \strokec4  tenant\cf5 \strokec5 :\cf4 \strokec4  \cf2 \strokec2 address\cf5 \strokec5 (\cf6 \strokec6 0\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 \});\cf4 \cb1 \strokec4 \
\cb3         owner \cf5 \strokec5 =\cf4 \strokec4  \cf13 \strokec13 msg\cf5 \strokec5 .\cf4 \strokec4 sender\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         setMonths\cf5 \strokec5 ();\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf2 \strokec2 function\cf4 \strokec4  setMonths\cf5 \strokec5 ()\cf4 \strokec4  \cf8 \strokec8 private\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "Jan"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "Feb"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "Mar"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "Apr"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "May"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "Jun"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "Jul"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "Aug"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "Sep"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "Oct"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "Nov"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         months\cf5 \strokec5 [\cf14 \strokec14 "Dec"\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf2 \strokec2 modifier\cf4 \strokec4  onlyOwner \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf13 \strokec13 require\cf5 \strokec5 (\cf13 \strokec13 msg\cf5 \strokec5 .\cf4 \strokec4 sender \cf5 \strokec5 ==\cf4 \strokec4  owner\cf5 \strokec5 ,\cf4 \strokec4  \cf14 \strokec14 "Only owner is authorized to perform this transaction"\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         _\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf2 \strokec2 modifier\cf4 \strokec4  nonOwner \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf13 \strokec13 require\cf5 \strokec5 (\cf13 \strokec13 msg\cf5 \strokec5 .\cf4 \strokec4 sender \cf5 \strokec5 !=\cf4 \strokec4  owner\cf5 \strokec5 ,\cf4 \strokec4  \cf14 \strokec14 "One who is not an owner is authorized to perform this action"\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         _\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf2 \strokec2 modifier\cf4 \strokec4  onlyTenant \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf13 \strokec13 require\cf5 \strokec5 (\cf13 \strokec13 msg\cf5 \strokec5 .\cf4 \strokec4 sender \cf5 \strokec5 ==\cf4 \strokec4  property\cf5 \strokec5 .\cf4 \strokec4 tenant\cf5 \strokec5 ,\cf4 \strokec4  \cf14 \strokec14 "Only tenant is allowed to carry out the transaction"\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         _\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf2 \strokec2 modifier\cf4 \strokec4  allowedMonths\cf5 \strokec5 (\cf2 \strokec2 string\cf4 \strokec4  \cf7 \strokec7 memory\cf4 \strokec4  month\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf13 \strokec13 require\cf5 \strokec5 (\cf4 \strokec4 months\cf5 \strokec5 [\cf4 \strokec4 month\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 ==\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ,\cf4 \strokec4  \cf14 \strokec14 "Incorrect value of the month"\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         _\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\
\cb3     \cf2 \strokec2 function\cf4 \strokec4  updateFee\cf5 \strokec5 (\cf2 \strokec2 uint\cf4 \strokec4  _fee\cf5 \strokec5 )\cf4 \strokec4  \cf8 \strokec8 public\cf4 \strokec4  onlyOwner \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         mintFee \cf5 \strokec5 =\cf4 \strokec4  _fee\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf2 \strokec2 function\cf4 \strokec4  updateNftAddress\cf5 \strokec5 (\cf2 \strokec2 address\cf4 \strokec4  _realNft\cf5 \strokec5 )\cf4 \strokec4  \cf8 \strokec8 public\cf4 \strokec4  onlyOwner \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3        realNft \cf5 \strokec5 =\cf4 \strokec4  RealNFT\cf5 \strokec5 (\cf4 \strokec4 _realNft\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf2 \strokec2 function\cf4 \strokec4  updateFeeAddress\cf5 \strokec5 (\cf2 \strokec2 address\cf4 \strokec4  \cf8 \strokec8 payable\cf4 \strokec4  _feeAddress\cf5 \strokec5 )\cf4 \strokec4  \cf8 \strokec8 public\cf4 \strokec4  onlyOwner \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3        platformFeeReciever \cf5 \strokec5 =\cf4 \strokec4  _feeAddress\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\cb3     \cb1 \
\cb3     \cf10 \strokec10 // setting the user as prospect\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 function\cf4 \strokec4  registerAsTenant\cf5 \strokec5 ()\cf4 \strokec4  \cf8 \strokec8 external\cf4 \strokec4  nonOwner \cf9 \strokec9 returns\cf4 \strokec4  \cf5 \strokec5 (\cf2 \strokec2 bool\cf4 \strokec4  success\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf13 \strokec13 require\cf5 \strokec5 (\cf4 \strokec4 property\cf5 \strokec5 .\cf4 \strokec4 rented \cf5 \strokec5 ==\cf4 \strokec4  \cf2 \strokec2 false\cf5 \strokec5 ,\cf4 \strokec4  \cf14 \strokec14 "Property is already on rent"\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         tenantRegistry\cf5 \strokec5 [\cf13 \strokec13 msg\cf5 \strokec5 .\cf4 \strokec4 sender\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 emit\cf4 \strokec4  reg\cf5 \strokec5 (\cf13 \strokec13 msg\cf5 \strokec5 .\cf4 \strokec4 sender\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         \cf9 \strokec9 return\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf10 \strokec10 // setting the property on rent by confirming the tenant from given list of prospects\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 function\cf4 \strokec4  confirmTenant\cf5 \strokec5 (\cf2 \strokec2 address\cf4 \strokec4  tenantAddress\cf5 \strokec5 )\cf4 \strokec4  \cf8 \strokec8 external\cf4 \strokec4  onlyOwner \cf9 \strokec9 returns\cf5 \strokec5 (\cf2 \strokec2 bool\cf4 \strokec4  success\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf13 \strokec13 require\cf5 \strokec5 (\cf4 \strokec4 tenantRegistry\cf5 \strokec5 [\cf4 \strokec4 tenantAddress\cf5 \strokec5 ]\cf4 \strokec4  \cf5 \strokec5 ==\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ,\cf4 \strokec4  \cf14 \strokec14 "Given tenant has not been registered yet."\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3             property\cf5 \strokec5 .\cf4 \strokec4 tenant \cf5 \strokec5 =\cf4 \strokec4  tenantAddress\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3             property\cf5 \strokec5 .\cf4 \strokec4 rented \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3             property\cf5 \strokec5 .\cf4 \strokec4 dueDate \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 (\cf4 \strokec4 now \cf5 \strokec5 +\cf4 \strokec4  \cf5 \strokec5 (\cf4 \strokec4 property\cf5 \strokec5 .\cf4 \strokec4 rentInterval \cf5 \strokec5 *\cf4 \strokec4  \cf6 \strokec6 1\cf4 \strokec4  days\cf5 \strokec5 ));\cf4 \cb1 \strokec4 \
\cb3             \cf2 \strokec2 emit\cf4 \strokec4  confirmed\cf5 \strokec5 (\cf4 \strokec4 tenantAddress\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3             \cf9 \strokec9 return\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf10 \strokec10 // rent payment payable method which also sets the next due date\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 function\cf4 \strokec4  payRent\cf5 \strokec5 (\cf2 \strokec2 string\cf4 \strokec4  \cf7 \strokec7 calldata\cf4 \strokec4   month\cf5 \strokec5 )\cf4 \strokec4  \cf8 \strokec8 external\cf4 \strokec4  \cf8 \strokec8 payable\cf4 \strokec4  onlyTenant allowedMonths\cf5 \strokec5 (\cf4 \strokec4 month\cf5 \strokec5 )\cf4 \strokec4  \cf9 \strokec9 returns\cf4 \strokec4  \cf5 \strokec5 (\cf2 \strokec2 bool\cf4 \strokec4  success\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf13 \strokec13 require\cf5 \strokec5 (\cf4 \strokec4 rentInStore\cf5 \strokec5 [\cf4 \strokec4 month\cf5 \strokec5 ].\cf4 \strokec4 status \cf5 \strokec5 ==\cf4 \strokec4  \cf2 \strokec2 false\cf5 \strokec5 ,\cf4 \strokec4  \cf14 \strokec14 "Rent already paid for the given month"\cf5 \strokec5 );\cf4 \strokec4  \cf10 \strokec10 // use require & not if statement, since function is payable & transaction should get reverted in invalid case.\cf4 \cb1 \strokec4 \
\cb3         \cf13 \strokec13 require\cf5 \strokec5 (\cf13 \strokec13 msg\cf5 \strokec5 .\cf4 \strokec4 value \cf5 \strokec5 ==\cf4 \strokec4  property\cf5 \strokec5 .\cf4 \strokec4 rentAmount\cf5 \strokec5 ,\cf4 \cb1 \strokec4 \
\cb3         \cf14 \strokec14 "Reverting transaction since given amount is not equal to actual amount"\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         rentInStore\cf5 \strokec5 [\cf4 \strokec4 month\cf5 \strokec5 ].\cf4 \strokec4 amount \cf5 \strokec5 =\cf4 \strokec4  \cf13 \strokec13 msg\cf5 \strokec5 .\cf4 \strokec4 value\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         rentInStore\cf5 \strokec5 [\cf4 \strokec4 month\cf5 \strokec5 ].\cf4 \strokec4 status \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         rentInStore\cf5 \strokec5 [\cf4 \strokec4 month\cf5 \strokec5 ].\cf4 \strokec4 validationDate \cf5 \strokec5 =\cf4 \strokec4  now\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         property\cf5 \strokec5 .\cf4 \strokec4 dueDate \cf5 \strokec5 =\cf4 \strokec4  \cf5 \strokec5 (\cf4 \strokec4 now \cf5 \strokec5 +\cf4 \strokec4  \cf5 \strokec5 (\cf4 \strokec4 property\cf5 \strokec5 .\cf4 \strokec4 rentInterval \cf5 \strokec5 *\cf4 \strokec4  \cf6 \strokec6 1\cf4 \strokec4  days\cf5 \strokec5 ));\cf4 \cb1 \strokec4 \
\cb3         property\cf5 \strokec5 .\cf4 \strokec4 tenantWarning \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 0\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 emit\cf4 \strokec4  rentPaid\cf5 \strokec5 (\cf4 \strokec4 month\cf5 \strokec5 ,\cf4 \strokec4  \cf13 \strokec13 msg\cf5 \strokec5 .\cf4 \strokec4 value\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         \cf9 \strokec9 return\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf10 \strokec10 // provides the rent status based on given month\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 function\cf4 \strokec4  getRentStatus\cf5 \strokec5 (\cf2 \strokec2 string\cf4 \strokec4  \cf7 \strokec7 calldata\cf4 \strokec4  month\cf5 \strokec5 )\cf4 \strokec4  \cf8 \strokec8 external\cf4 \strokec4  allowedMonths\cf5 \strokec5 (\cf4 \strokec4 month\cf5 \strokec5 )\cf4 \strokec4  \cf8 \strokec8 view\cf4 \strokec4  \cf9 \strokec9 returns\cf5 \strokec5 (\cf2 \strokec2 uint\cf4 \strokec4  amount\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 uint\cf4 \strokec4  date\cf5 \strokec5 ,\cf4 \strokec4  \cf2 \strokec2 bool\cf4 \strokec4  status\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         MonthlyRentStatus \cf7 \strokec7 memory\cf4 \strokec4  rentStatus \cf5 \strokec5 =\cf4 \strokec4  rentInStore\cf5 \strokec5 [\cf4 \strokec4 month\cf5 \strokec5 ];\cf4 \cb1 \strokec4 \
\cb3         \cf9 \strokec9 return\cf4 \strokec4  \cf5 \strokec5 (\cf4 \cb1 \strokec4 \
\cb3             rentStatus\cf5 \strokec5 .\cf4 \strokec4 amount\cf5 \strokec5 ,\cf4 \cb1 \strokec4 \
\cb3             rentStatus\cf5 \strokec5 .\cf4 \strokec4 validationDate\cf5 \strokec5 ,\cf4 \cb1 \strokec4 \
\cb3             rentStatus\cf5 \strokec5 .\cf4 \strokec4 status\cb1 \
\cb3         \cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf10 \strokec10 // an api for property owner to withdraw the rent amount from smart contract.\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 function\cf4 \strokec4  withdrawRent\cf5 \strokec5 (\cf2 \strokec2 string\cf4 \strokec4  \cf7 \strokec7 calldata\cf4 \strokec4  month\cf5 \strokec5 )\cf4 \strokec4  \cf8 \strokec8 external\cf4 \strokec4  onlyOwner allowedMonths\cf5 \strokec5 (\cf4 \strokec4 month\cf5 \strokec5 )\cf4 \strokec4  \cf9 \strokec9 returns\cf4 \strokec4  \cf5 \strokec5 (\cf2 \strokec2 bool\cf4 \strokec4  success\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf13 \strokec13 require\cf5 \strokec5 (\cf4 \strokec4 rentInStore\cf5 \strokec5 [\cf4 \strokec4 month\cf5 \strokec5 ].\cf4 \strokec4 amount \cf5 \strokec5 <=\cf4 \strokec4  \cf2 \strokec2 address\cf5 \strokec5 (\cf15 \strokec15 this\cf5 \strokec5 ).\cf4 \strokec4 balance\cf5 \strokec5 ,\cf4 \strokec4  \cf14 \strokec14 "Insufficient contract balance to suffice the transaction"\cf5 \strokec5 );\cf4 \strokec4  \cf10 \strokec10 // This is a must condition.\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 uint\cf4 \strokec4  balance \cf5 \strokec5 =\cf4 \strokec4  rentInStore\cf5 \strokec5 [\cf4 \strokec4 month\cf5 \strokec5 ].\cf4 \strokec4 amount\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         \cf16 \strokec16 if\cf5 \strokec5 (\cf4 \strokec4 balance \cf5 \strokec5 ==\cf4 \strokec4  property\cf5 \strokec5 .\cf4 \strokec4 rentAmount\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3             owner\cf5 \strokec5 .\cf4 \strokec4 transfer\cf5 \strokec5 (\cf4 \strokec4 balance\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3             rentInStore\cf5 \strokec5 [\cf4 \strokec4 month\cf5 \strokec5 ].\cf4 \strokec4 amount \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 0\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 emit\cf4 \strokec4  rentWithdrawn\cf5 \strokec5 (\cf4 \strokec4 month\cf5 \strokec5 ,\cf4 \strokec4  property\cf5 \strokec5 .\cf4 \strokec4 rentAmount\cf5 \strokec5 );\cf4 \strokec4  \cf10 \strokec10 // confirming the rent withdraw transaction.\cf4 \cb1 \strokec4 \
\cb3         \cf9 \strokec9 return\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf10 \strokec10 // when owner wants to warn the tenant about pending rent payment.\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 function\cf4 \strokec4  warnTenant\cf5 \strokec5 (\cf2 \strokec2 string\cf4 \strokec4  \cf7 \strokec7 calldata\cf4 \strokec4  month\cf5 \strokec5 )\cf4 \strokec4  \cf8 \strokec8 external\cf4 \strokec4  onlyOwner allowedMonths\cf5 \strokec5 (\cf4 \strokec4 month\cf5 \strokec5 )\cf4 \strokec4  \cf9 \strokec9 returns\cf4 \strokec4  \cf5 \strokec5 (\cf2 \strokec2 bool\cf4 \strokec4  success\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf13 \strokec13 require\cf5 \strokec5 (\cf4 \strokec4 property\cf5 \strokec5 .\cf4 \strokec4 rented \cf5 \strokec5 ==\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ,\cf4 \strokec4  \cf14 \strokec14 "Tenant doesn't exists"\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         \cf16 \strokec16 if\cf5 \strokec5 ((\cf4 \strokec4 rentInStore\cf5 \strokec5 [\cf4 \strokec4 month\cf5 \strokec5 ].\cf4 \strokec4 status \cf5 \strokec5 ==\cf4 \strokec4  \cf2 \strokec2 false\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 &&\cf4 \strokec4  \cf5 \strokec5 (\cf4 \strokec4 now \cf5 \strokec5 >\cf4 \strokec4  property\cf5 \strokec5 .\cf4 \strokec4 dueDate\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 &&\cf4 \strokec4  \cf5 \strokec5 ((\cf4 \strokec4 now \cf5 \strokec5 -\cf4 \strokec4  warningTime\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 >\cf4 \strokec4  \cf6 \strokec6 172800000\cf5 \strokec5 ))\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3             property\cf5 \strokec5 .\cf4 \strokec4 tenantWarning\cf5 \strokec5 ++;\cf4 \cb1 \strokec4 \
\cb3             warningTime \cf5 \strokec5 =\cf4 \strokec4  now\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3             \cf2 \strokec2 emit\cf4 \strokec4  tenantWarning\cf5 \strokec5 (\cf4 \strokec4 month\cf5 \strokec5 ,\cf4 \strokec4  property\cf5 \strokec5 .\cf4 \strokec4 tenantWarning\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3             \cf9 \strokec9 return\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\cb3         \cf9 \strokec9 return\cf4 \strokec4  \cf2 \strokec2 false\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\
\cb3     \cf10 \strokec10 // when warning limit has been crossed & owner wants to dismiss the tenant\cf4 \cb1 \strokec4 \
\cb3     \cf2 \strokec2 function\cf4 \strokec4  dismissTenant\cf5 \strokec5 ()\cf4 \strokec4  \cf8 \strokec8 external\cf4 \strokec4  onlyOwner \cf9 \strokec9 returns\cf4 \strokec4  \cf5 \strokec5 (\cf2 \strokec2 bool\cf4 \strokec4  success\cf5 \strokec5 )\cf4 \strokec4  \cf5 \strokec5 \{\cf4 \cb1 \strokec4 \
\cb3         \cf13 \strokec13 require\cf5 \strokec5 (\cf4 \strokec4 property\cf5 \strokec5 .\cf4 \strokec4 tenantWarning \cf5 \strokec5 >\cf4 \strokec4  property\cf5 \strokec5 .\cf4 \strokec4 warningLimit\cf5 \strokec5 ,\cf14 \strokec14 "Cannot dismiss tenant as warning limit is below threshold"\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         property\cf5 \strokec5 .\cf4 \strokec4 tenant \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 address\cf5 \strokec5 (\cf6 \strokec6 0\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         property\cf5 \strokec5 .\cf4 \strokec4 rented \cf5 \strokec5 =\cf4 \strokec4  \cf2 \strokec2 false\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         property\cf5 \strokec5 .\cf4 \strokec4 tenantWarning \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 0\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         property\cf5 \strokec5 .\cf4 \strokec4 dueDate \cf5 \strokec5 =\cf4 \strokec4  \cf6 \strokec6 0\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3         \cf2 \strokec2 emit\cf4 \strokec4  dismissTenantConfirmed\cf5 \strokec5 (\cf2 \strokec2 true\cf5 \strokec5 );\cf4 \cb1 \strokec4 \
\cb3         \cf9 \strokec9 return\cf4 \strokec4  \cf2 \strokec2 true\cf5 \strokec5 ;\cf4 \cb1 \strokec4 \
\cb3     \cf5 \strokec5 \}\cf4 \cb1 \strokec4 \
\pard\pardeftab720\partightenfactor0
\cf5 \cb3 \strokec5 \}\cf4 \cb1 \strokec4 \
}