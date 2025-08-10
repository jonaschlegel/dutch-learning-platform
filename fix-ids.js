const fs = require('fs');
const path = require('path');

// Read the vocabulary file
const vocabularyPath = path.join(__dirname, 'data', 'vocabulary.ts');
let content = fs.readFileSync(vocabularyPath, 'utf8');

// Define the mapping for Chapter 8 IDs
// Chapter 7 uses IDs 1096-1206, so Chapter 8 should start from 1207
const chapter8IdMap = {
  1097: '1208',
  1098: '1209',
  1099: '1210',
  1100: '1211',
  1101: '1212',
  1102: '1213',
  1103: '1214',
  1104: '1215',
  1105: '1216',
  1106: '1217',
  1107: '1218',
  1108: '1219',
  1109: '1220',
  1110: '1221',
  1111: '1222',
  1112: '1223',
  1113: '1224',
  1114: '1225',
  1115: '1226',
  1116: '1227',
  1117: '1228',
  1118: '1229',
  1119: '1230',
  1120: '1231',
  1121: '1232',
  1122: '1233',
  1123: '1234',
  1124: '1235',
  1125: '1236',
  1126: '1237',
  1127: '1238',
  1128: '1239',
  1129: '1240',
  1130: '1241',
  1131: '1242',
  1132: '1243',
  1133: '1244',
  1134: '1245',
  1135: '1246',
  1136: '1247',
  1137: '1248',
  1138: '1249',
  1139: '1250',
  1140: '1251',
  1141: '1252',
  1142: '1253',
  1143: '1254',
  1144: '1255',
  1145: '1256',
  1146: '1257',
  1147: '1258',
  1148: '1259',
  1149: '1260',
  1150: '1261',
  1151: '1262',
  1152: '1263',
  1153: '1264',
  1154: '1265',
  1155: '1266',
  1156: '1267',
  1157: '1268',
  1158: '1269',
  1159: '1270',
  1160: '1271',
  1161: '1272',
  1162: '1273',
  1163: '1274',
  1164: '1275',
  1165: '1276',
  1166: '1277',
  1167: '1278',
  1168: '1279',
  1169: '1280',
  1170: '1281',
  1171: '1282',
  1172: '1283',
  1173: '1284',
  1174: '1285',
  1175: '1286',
  1176: '1287',
  1177: '1288',
  1178: '1289',
  1179: '1290',
  1180: '1291',
  1181: '1292',
  1182: '1293',
  1183: '1294',
  1184: '1295',
  1185: '1296',
  1186: '1297',
  1187: '1298',
  1188: '1299',
  1189: '1300',
  1190: '1301',
  1191: '1302',
};

// Find the start of Chapter 8
const chapter8Start = content.indexOf('// Chapter 8 - Bij de makelaar');
if (chapter8Start === -1) {
  console.error('Could not find Chapter 8 start');
  process.exit(1);
}

// Extract the Chapter 8 section
const chapter8Section = content.substring(chapter8Start);

// Replace IDs in Chapter 8 section only
let updatedChapter8 = chapter8Section;
for (const [oldId, newId] of Object.entries(chapter8IdMap)) {
  const pattern = new RegExp(`id: '${oldId}',`, 'g');
  updatedChapter8 = updatedChapter8.replace(pattern, `id: '${newId}',`);
}

// Reconstruct the full content
const updatedContent = content.substring(0, chapter8Start) + updatedChapter8;

// Write back to file
fs.writeFileSync(vocabularyPath, updatedContent, 'utf8');
console.log('Successfully updated Chapter 8 IDs');
