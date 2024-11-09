"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var button_1 = require("@/components/ui/button");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var use_toast_1 = require("@/components/ui/use-toast");
var zod_1 = require("@hookform/resolvers/zod");
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var fa_1 = require("react-icons/fa");
var z = require("zod");
var MAX_FILE_SIZE = 5000000;
var ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
// form data validation using zod
var profileFormSchema = z.object({
    name: z
        .string()
        .min(2, {
        message: "Nama setidaknya 2 karakter."
    })
        .max(30, {
        message: "Nama tidak boleh lebih dari 30 karakter."
    }),
    contact: z
        .string()
        .min(2, {
        message: "Pesan setidaknya 2 karakter"
    })
        .max(500, {
        message: "Pesan tidak boleh lebih dari 500 karakter."
    }),
    message: z.string().max(160).min(4),
    urls: z
        .array(z.object({
        value: z.string().url({ message: "Please enter a valid URL." })
    }))
        .optional()
});
// This can come from your database or API. Default values for the form fields.
var defaultValues = {
    name: "",
    contact: "",
    message: ""
};
// handle file upload
// ---------------------------------------------------------
var ContactForm = function () {
    // Function for when to check if the form is valid
    var form = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(profileFormSchema),
        defaultValues: defaultValues,
        mode: "onChange"
    });
    // testing use state
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    // function to submit the form
    var submitForm = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var response, responseData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    use_toast_1.toast({
                        title: "Hold on!"
                    });
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("/api/contact", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("Error sending email");
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    responseData = _a.sent();
                    // Handle response data as needed
                    // Add toast here
                    use_toast_1.toast({
                        variant: "default",
                        title: "Message sent!",
                        description: "We'll get back to you soon."
                    });
                    // set loading to false
                    setLoading(false);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    use_toast_1.toast({
                        variant: "destructive",
                        title: "Message not sent!",
                        description: "We'll fix the problem ASAP."
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    function setFile(arg0) {
        throw new Error("Function not implemented.");
    }
    return (React.createElement(form_1.Form, __assign({}, form),
        React.createElement("form", { onSubmit: form.handleSubmit(submitForm), className: "space-y-5 text-xs sm:text-base" },
            React.createElement(form_1.FormField, { control: form.control, name: "name", render: function (_a) {
                    var field = _a.field;
                    return (React.createElement(form_1.FormItem, null,
                        React.createElement(form_1.FormLabel, null, "Nama"),
                        React.createElement(form_1.FormControl, null,
                            React.createElement(input_1.Input, __assign({ type: "text", placeholder: "Tulis nama Anda (bisa dikosongkan)", autoComplete: "true" }, field))),
                        React.createElement(form_1.FormMessage, null)));
                } }),
            React.createElement(form_1.FormField, { control: form.control, name: "contact", render: function (_a) {
                    var field = _a.field;
                    return (React.createElement(form_1.FormItem, null,
                        React.createElement(form_1.FormLabel, null, "Kontak"),
                        React.createElement(form_1.FormControl, null,
                            React.createElement(input_1.Input, __assign({ type: "contact", placeholder: "Tulis kontak Anda (no. telp / email / sosial media)", autoComplete: "true" }, field))),
                        React.createElement(form_1.FormMessage, null)));
                } }),
            React.createElement(form_1.FormField, { control: form.control, name: "message", render: function (_a) {
                    var field = _a.field;
                    return (React.createElement(form_1.FormItem, null,
                        React.createElement(form_1.FormLabel, null, "Umpan balik"),
                        React.createElement(form_1.FormControl, null,
                            React.createElement(textarea_1.Textarea, __assign({ placeholder: "Tulis umpan balik Anda", className: "resize-none" }, field, { autoComplete: "true" }))),
                        React.createElement(form_1.FormDescription, null, "Tuliskan masukan dan umpan balik Anda di sini, kami akan menghubungi Anda jika diperlukan."),
                        React.createElement(form_1.FormMessage, null)));
                } }),
            React.createElement("div", { className: "flex justify-center md:justify-start pt-5" },
                React.createElement(button_1.Button, { className: "text-xl p-6", type: "submit", variant: 'blue', disabled: loading },
                    "Kirim ",
                    React.createElement(fa_1.FaPaperPlane, { className: "ml-2" }))))));
};
exports["default"] = ContactForm;
