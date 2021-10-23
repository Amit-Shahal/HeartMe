"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var getTestNamesUrl = "https://s3.amazonaws.com/s3.helloheart.home.assignment/bloodTestConfig.json";
var bloodTests = [];
function SubmitBloodTestResults() {
    var _this = this;
    //user inputs
    var _a = react_1.useState("Test Name"), userInputTestName = _a[0], setUserInputTestName = _a[1];
    var _b = react_1.useState(0), userInputTestResult = _b[0], setUserInputTestResult = _b[1];
    // handle view
    var _c = react_1.useState(false), showResult = _c[0], setShowResult = _c[1];
    var _d = react_1.useState(false), result = _d[0], setResult = _d[1];
    //
    var _e = react_1.useState(), identifiedBloodTest = _e[0], setIdentifiedBloodTest = _e[1];
    react_1.useEffect(function () {
        getTestNames();
    }, []);
    var getTestNames = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(getTestNamesUrl)
                        .then(function (response) { return response.json(); })
                        .then(function (data) {
                        //lower case response.name
                        data.bloodTestConfig.forEach(function (bTest) {
                            bTest.name = bTest.name.toLowerCase();
                        });
                        bloodTests = data.bloodTestConfig;
                    })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleBloodTest = function () {
        var bTest = identifyBloodTest();
        if (bTest !== undefined) {
            setIdentifiedBloodTest(bTest);
            setShowResult(true);
            bTest.threshold >= userInputTestResult
                ? setResult(true)
                : setResult(false);
        }
        else {
            setShowResult(false);
            react_native_1.Alert.alert("The Blood Test You Typed Is Unknown", "Please Reenter");
        }
    };
    var identifyBloodTest = function () {
        var userInput = remove_WhiteSpace_And_Special_Chars(userInputTestName.toLowerCase());
        var mostMatches = 0;
        var mostMatchesBloodTest = {
            name: "",
            threshold: -1
        };
        bloodTests.forEach(function (bloodTest) {
            var numOfMatches = checkCompatibility(bloodTest.name, userInput);
            if (mostMatches < numOfMatches) {
                mostMatches = numOfMatches;
                mostMatchesBloodTest = bloodTest;
            }
        });
        if (mostMatches === 0) {
            return;
        }
        return mostMatchesBloodTest;
    };
    var checkCompatibility = function (bloodTestName, userInput) {
        // this turns each bloodTest to an array of strings, and searches for each word if it's in user's input
        var arr = bloodTestName.split(" ");
        var numOfMatches = 0;
        arr.forEach(function (word) {
            if (userInput.search(word) >= 0) {
                numOfMatches += 1;
            }
        });
        return numOfMatches;
    };
    var remove_WhiteSpace_And_Special_Chars = function (userInput) {
        //this turns "hello - World!" to "hello_World"
        var newString = userInput.replace(/[^A-Z0-9]+/gi, "_");
        return newString;
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.inputForm}>
        <react_native_1.Image style={styles.HelloHeartImg} source={{
            uri: "https://uploads-ssl.webflow.com/5d5c09963ef06a876ff2fb31/5d66b48b5e626fcd1d2b5f9c_HelloHeart_Logo_FullColor_RGB-p-500.png"
        }}/>
        <react_native_1.View style={styles.InputTitle}>
          <react_native_1.Text style={styles.txt}>Test Name:</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.TextInput style={styles.input} onChangeText={function (value) { return setUserInputTestName(value); }}/>
        <react_native_1.View style={styles.InputTitle}>
          <react_native_1.Text style={styles.txt}>Result:</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.TextInput keyboardType="number-pad" style={styles.input} onChangeText={function (value) { return setUserInputTestResult(Number(value)); }}/>
        <react_native_1.TouchableOpacity onPress={handleBloodTest}>
          <react_native_1.Text style={styles.btn}>Submit</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      <react_native_1.View style={styles.result}>
        {showResult ? (result ? (<>
              <react_native_1.Text style={styles.txt} numberOfLines={1} adjustsFontSizeToFit>
                Your {identifiedBloodTest === null || identifiedBloodTest === void 0 ? void 0 : identifiedBloodTest.name} blood test result is GOOD!
              </react_native_1.Text>
              <react_native_1.Text style={styles.txt}>Good!</react_native_1.Text>
              <react_native_1.Image style={styles.resultImg} source={{
                uri: "https://i.pinimg.com/564x/32/c0/7f/32c07f1b29822841522c90947d127c2a.jpg"
            }}/>
            </>) : (<>
              <react_native_1.Text style={styles.txt} numberOfLines={1} adjustsFontSizeToFit>
                Your {identifiedBloodTest === null || identifiedBloodTest === void 0 ? void 0 : identifiedBloodTest.name} blood test result is BAD!
              </react_native_1.Text>
              <react_native_1.Image style={styles.resultImg} source={{
                uri: "https://i.pinimg.com/736x/b7/57/e0/b757e029d3743b6da461434fbc4f713d--symbols-emoticons-heart-pictures.jpg"
            }}/>
            </>)) : (<react_native_1.View />)}
      </react_native_1.View>
      <react_native_1.View style={styles.signature}>
        <react_native_1.Text style={{ fontFamily: "Zapfino" }}>Made By Amit Shahal</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
}
exports["default"] = SubmitBloodTestResults;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        top: react_native_1.StatusBar.currentHeight || 40,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    result: {
        flex: 6,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    inputForm: {
        flex: 3,
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    HelloHeartImg: {
        height: 60,
        width: "90%"
    },
    InputTitle: {
        width: "90%",
        justifyContent: "flex-start"
    },
    input: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "rgb(244,36,64)",
        width: "90%",
        height: 45
    },
    txt: {
        fontFamily: "Futura",
        fontWeight: "400",
        fontSize: 20
    },
    btn: {
        top: 4,
        fontFamily: "Futura",
        fontWeight: "400",
        fontSize: 30
    },
    signature: {
        flex: 1
    },
    resultImg: {
        width: "90%",
        // height: undefined,
        aspectRatio: 1.2
    }
});
