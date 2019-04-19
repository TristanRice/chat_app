const chai = require("chai")
    , chaiHTTP = require("chai-http")
    , should   = chai.should( )
    , expect   = chai.expect
    , mongoose = require("mongoose")
    , User     = require("../models/user");


chai.use(chaiHTTP);
BASE_URL = "http://localhost:3000";
REGISTER_URL = "/api/v1/user/register";
PARAMETERS   = ["username", "email", "password"];
mongoose.connect("mongodb://localhost/random_chat_app");

User.deleteMany({}, (err) => {
	console.log(err);
	if (err)
		throw err;

	console.log("Users removed from database");
});

const Users = [{
	"username": "TristanRice",
	"email": "tristan@colmderis.com",
	"password": "Th1S_IS_Not_my_P4SSWORD",
	"password2": "Th1S_IS_Not_my_P4SSWORD"
},
{
	"username": "DisplacerBeas",
	"email": "minor_2468@hotmail.com",
	"password": "Th1S_IS_Not_my_P4SSWORD",
	"password2": "Th1S_IS_Not_my_P4SSWORD"
},
{
	"username": "minor2468",
	"email": "minr6750@gmail.com",
	"password": "0THER_random_p4SSWORD",
	"password2": "0THER_random_p4SSWORD"
}];

describe("Users", ( ) => { 
	describe("/POST /api/v1/user/register", ( ) => {
		it("Should be unsuccessful without any parameters", (done) => {
			chai.request(BASE_URL)
				.post(REGISTER_URL)
				.end((err, res) => {
					res.should.have.status(200);
					res.should.be.a("object");
					const body = res.body
					body.should.have.property("success").eql(false);
					body.should.have.property("errType").eql("invalid_data");
					body.should.have.property("errors");
					expect(body["errors"]).to.be.an("array");
					const errors = res.body["errors"];
					PARAMETERS.forEach(function(parameter) {
						expect(errors.find(element => element["param"] === parameter))
							.to.be.an("object");
					});
					done( );
				});
		});
	});

	describe(`/POST ${REGISTER_URL}`, ( ) => {
		it("Should reject empty parameters", (done) => {
			const User = {
				"username": "",
				"email": "",
				"password": "",
				"password2": ""
			};
			chai.request(BASE_URL)
				.post(REGISTER_URL)
				.send(User)
				.end((err, res) => {
					res.should.have.status(200);
					const body = res.body
					body.should.be.a("object");
					body.should.have.property("success").eql(false);
					body.should.have.property("errType").eql("invalid_data");
					body.should.have.property("errors");
					expect(body["errors"]).to.be.an("array");
					const errors = body["errors"];
					PARAMETERS.forEach(function(parameter) {
						expect(errors.find(element => element["param"] === parameter))
							.to.be.an("object");
					});
					done( );
				});
		});
	});

	describe(`/POST ${REGISTER_URL}`, ( ) => {
		usernames = ["", "a", "aa"];
		function run(username) {
			it("Should reject a username that is too short", (done) => {
				const User = {
					"username": username,
					"email": "test@test.com",
					"password": "RRxU6JMyC'Bnp(=)",
					"password2": "RRxU6JMyC'Bnp(=)"
				};
				chai.request(BASE_URL)
					.post(REGISTER_URL)
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;
						body.should.be.an("object")
							.which.has.a.property("success")
							.that.equals(false);

						body.should.have.a.property("errType")
							.which.equals("invalid_data");

						body.should.have.a.property("errors")
							.which.is.an("array");

						const errors = body.errors;
						errors.find(element => element["param"] === "username")
							.should.be.an("object")
							.which.has.a.property("param")
							.that.is.a("string");

						errors.find(element => element["param"] === "username")
							.should.have.a.property("msg")
							.which.is.a("string")
							.and.equals("Username must be between 3 and 15 characters long");

						done( );
					});
			});
		}
		usernames.forEach(function(username) {
			run(username)
		});
	});

	describe(`/POST ${REGISTER_URL}`, ( ) => {
		const a = times => "a".repeat(times);
		const usernames = [a(16), a(17), a(18), a(19), a(20), a(30), a(40),
						   a(50), a(60), a(70), a(80), a(90), a(100), a(200),
						   a(300), a(400), a(500), a(600), a(700), a(800), a(900)];

		function run(username) {
			it("Should reject a username that is too long", (done) => {
				const User = {
					"username": username,
					"email": "test@test.com",
					"password": "RRxU6JMyC'Bnp(=)",
					"password2": "RRxU6JMyC'Bnp(=)"
				};
				chai.request(BASE_URL)
					.post(REGISTER_URL)
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;
						body.should.be.an("object")
							.which.has.a.property("success")
							.that.equals(false);

						body.should.have.a.property("errType")
							.which.equals("invalid_data");

						body.should.have.a.property("errors")
							.which.is.an("array");

						const errors = body.errors;
						errors.find(element => element["param"] === "username")
							.should.be.an("object")
							.which.has.a.property("param")
							.that.is.a("string");

						errors.find(element => element["param"] === "username")
							.should.have.a.property("msg")
							.which.is.a("string")
							.and.equals("Username must be between 3 and 15 characters long");

						done( );
					});
			});
		}
		usernames.forEach(function(username) {
			run(username)
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		const usernames = ["aa)", "[!@#$", "/.A", "qpr!${]", "aaa$",
						   "aaa$", "1233*!@", "[]_+!", "aaa$!234", ")(*1",
						   ")*&@", "?><", "34hh1h1hh1(", "312)(1", "11)(a",
						   "aaaa*", "*aaaa", "eu12@", ")(!@a", "12()AS",
						   "👌👌👌👌", "😄😆😉😆😉" ,"🙂🤗🤩🤔🤨😐"];
		function run(username) {
			it("Should reject a username that is not alphanumeric", (done) => {
				const User = {
					"username": username,
					"email": "test@test.com",
					"password": "RRxU6JMyC'Bnp(=)",
					"password2": "RRxU6JMyC'Bnp(=)"
				};
				chai.request(BASE_URL)
					.post(REGISTER_URL)
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;
						body.should.be.an("object")
							.which.has.a.property("success")
							.that.equals(false);

						body.should.have.a.property("errType")
							.which.equals("invalid_data");

						body.should.have.a.property("errors")
							.which.is.an("array");

						const errors = body.errors;
						errors.find(element => element["param"] === "username")
							.should.be.an("object")
							.which.has.a.property("param")
							.that.is.a("string");

						errors.find(element => element["param"] === "username")
							.should.have.a.property("msg")
							.which.is.a("string")
							.and.equals("Username must be alphanumeric");

						done( );
					});
			});
		}

		usernames.forEach(function(username) {
			run(username)
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		const usernames = ["[1", "~a", "$", "1[", "()", "$", "@,", "a-",
						   "=-", "%^", "*", "!", "%!", "{)", "[p", "++", "--",
						   "l@", "=?", "b;", ";;", ";:", "!@", "*$", "[", "]", "="]
		function run(username) {
			it("Should reject a username that is too short and is not alphanumeric", (done) => {
				const User = {
					"username": username,
					"email": "test@test.com",
					"password": "RRxU6JMyC'Bnp(=)",
					"password2": "RRxU6JMyC'Bnp(=)"
				};
				chai.request(BASE_URL)
					.post(REGISTER_URL)
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;
						body.should.be.an("object")
							.which.has.a.property("success")
							.that.equals(false);

						body.should.have.a.property("errType")
							.which.equals("invalid_data");

						body.should.have.a.property("errors")
							.which.is.an("array");

						body.errors.length.should.equal(2);
						body.errors[0].should.have.a.property("param")
							.which.equals("username");

						body.errors[0].should.have.a.property("msg")
							.which.equals("Username must be between 3 and 15 characters long")
						
						body.errors[1].should.have.a.property("param")
							.which.equals("username");
						body.errors[1].should.have.a.property("msg")
							.which.equals("Username must be alphanumeric");
						done( );
					});
			});
		}
		usernames.forEach(function(username) {
			run(username);
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		const a = (sc, times) => sc+"a".repeat(times);
		const usernames = [a("[]", 16), a("#)", 17), a("*!", 18), a("+_", 19), a("!!!!$", 20),
						   a(";:", 30), a("?????", 40), a("!@#)(*!", 50), a("+_!+", 60), a(":", 70),
						   a("}{}{}{!+_@#(", 80), a("!)@(#*!)!+_+!?|}{|}{|}{", 90), a("^", 100),
						   a("123@",200), a(";:;1}{}{}{<>'<>>.", 300), a("#", 400), a(";", 500)];

		function run(username) {
			it("Should reject a username that is too long and is not alphanumeric", (done) => {
				const User = {
					"username": username,
					"email": "test@test.com",
					"password": "RRxU6JMyC'Bnp(=)",
					"password2": "RRxU6JMyC'Bnp(=)"
				};
				chai.request(BASE_URL)
					.post(REGISTER_URL)
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;
						body.should.be.an("object")
							.which.has.a.property("success")
							.that.equals(false);

						body.should.have.a.property("errType")
							.which.equals("invalid_data");

						body.should.have.a.property("errors")
							.which.is.an("array");

						body.errors.length.should.equal(2);
						body.errors[0].should.have.a.property("param")
							.which.equals("username");

						body.errors[0].should.have.a.property("msg")
							.which.equals("Username must be between 3 and 15 characters long")
						
						body.errors[1].should.have.a.property("param")
							.which.equals("username");
						body.errors[1].should.have.a.property("msg")
							.which.equals("Username must be alphanumeric");
						done( );
					});
			});
		}
		usernames.forEach(function(username) {
			run(username);
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		const a = (sc, times) => sc+"a".repeat(times);
		const usernames = ["username", "displacerbeast", "username123", "user",
						   "ilikeuser", "thisisacoo", "ifone", "120aqad1",
						   "goousername", "Tristan", "Rice", "displacer", "beast"];

		function run(username) {
			it("Should allow a valid username", (done) => {
				const User = {
					"username": username,
					"email": "test@test.com",
					"password": "RRxU6JMyC'Bnp(=)",
					"password2": "RRxU6JMyC'Bnp(=)"
				};
				chai.request(BASE_URL)
					.post(REGISTER_URL+"?test=true")
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;
						body.should.be.an("object");

						body.should.have.a.property("success")
							.which.equals(true);

						body.should.not.have.a.property("errors");
						done( );
					});
			});
		}
		usernames.forEach(function(username) {
			run(username);
		});
	});


	describe(`/POST ${REGISTER_URL}`, (done) => {
		const a = (sc, times) => sc+"a".repeat(times);
		const emails = ["username", "displacerbeast", "username123", "user",
						"ilikeuser", "thisisacoo", "ifone", "120aqad1",
						"goousername", "Tristan", "Rice", "displacer", "beast", //just copy the above usernames lol
						"a@a", "B.com", "2a@1a.", "plainaddress", "#@%^%#$@#$@#.com",
						"@example.com", "Joe Smith <email@example.com>", "email.example.com",
						"email@example@example.com", ".email@example.com", "email.@example.com",
						"email..email@example.com", "あいうえお@example.com",
						"email@example.com (Joe Smith)", "email@example", "email@-example.com",
						"email@example", "email@111.222.333.44444",
						"email@example..com", "Abc..123@example.com"];

		function run(email) {
			it("Should not allow invalid emails", (done) => {
				const User = {
					"username": "username",
					"email": email,
					"password": "RRxU6JMyC'Bnp(=)",
					"password2": "RRxU6JMyC'Bnp(=)"
				};
				chai.request(BASE_URL)
					.post(REGISTER_URL+"?test=true")
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);

						const body = res.body;

						body.should.be.an("object")
							.which.has.a.property("success")
							.that.equals(false);

						body.should.have.a.property("errType")
							.which.equals("invalid_data");

						body.should.have.a.property("errors")
							.which.is.an("array");
						if (body.success)
							console.log(body);
						body.errors.length.should.equal(1);
						body.errors[0].should.have.a.property("param")
							.which.is.a("string")
							.and.equals("email");

						body.errors[0].should.have.a.property("msg")
							.which.is.a("string")
							.and.equals("You must enter a valid email");


						done( );
					});
			});
		}
		emails.forEach(function(email) {
			run(email);
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		const emails = ["email@domain.com", "firstname.lastname@domain.com",
						   "email@subdomain.domain.com", "firstname+lastname@domain.com",
						   "email@123.123.123.123", "email@[123.123.123.123]",
						   "\"email\"@domain.com", "1234567890@domain.com",
						   "email@domain-one.com", "_______@domain.com",
						   "email@domain.name", "email@domain.co.jp",
						   "firstname-lastname@domain.com"];

		function run(email) {
			it("Should allow a valid emails", (done) => {
				const User = {
					"username": "username",
					"email": email,
					"password": "RRxU6JMyC'Bnp(=)",
					"password2": "RRxU6JMyC'Bnp(=)"
				};
				chai.request(BASE_URL)
					.post(REGISTER_URL+"?test=true")
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;
						body.should.be.an("object");

						body.should.have.a.property("success")
							.which.equals(true);

						body.should.not.have.a.property("errors");
						done( );
					});
			});
		}
		emails.forEach(function(email) {
			run(email);
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		const passwords = ["password", "hunter2", "THISISCORRECTRIGHT1234_", "weakpass1234",
						   "@@@aaAAA", "A@#)(*", "isthisagoodpassWORD12", "imbismuda123",
						   "123456", "password", "12345678", "1234", "pussy", "12345", 
						   "dragon", "qwerty", "696969", "mustang", "letmein", "baseball", 
						   "master", "michael", "football", "shadow"]

		function run(password) {
			it("Should reject weak passwords", (done) => {
				const User = {
					"username": "username",
					"email": "example@example.com",
					"password": password,
					"password2": password
				}
				chai.request(BASE_URL)
					.post(REGISTER_URL+"?test=true")
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;

						body.should.be.an("object")
							.which.has.a.property("success")
							.that.equals(false);

						body.should.have.a.property("errType")
							.which.equals("invalid_data");

						body.should.have.a.property("errors")
							.which.is.an("array");

						body.errors.length.should.equal(1);
						body.errors[0].should.have.a.property("param")
							.which.is.a("string")
							.and.equals("password");

						body.errors[0].should.have.a.property("msg")
							.which.is.a("string")
							.and.equals("Your password must contain a lowercase letter, an uppercase letter, a number, and a special character");

						done( );

					});
			});
		}

		passwords.forEach(function(password) {
			run(password);
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		
		const passwords = ["m@|682e~^B1C", "6$6O{d1`2)bL", "B31F+cn1%2?%", "&31S;2lf%}B1", "ec3VU151(#%;",
						   "f8#@}5v%L88D", "1e(d3K4+^1G+", "ce4%6*1$&CM2", "_2j62@3G##xF", "6}3~1JeMv6$#",
						   "h[dB2(C}*125", "`1$z^~g74G3Q", "+3&)23#J4bdK", "#$612&tBiB3+", "&fe1_%B1%2B8",
						   "b^152l2#@D#D", "[23oE*Ge}1%1", "QBb21@)3$1`b", "$EMn311*6)l}", "OD14[@8@hb1|",
						   "B7Dn12}(@2d+", "FI2|13$_cc1&", "C(b4@%1l6^B4", "1cb4B~8%`1+L", "Cu)~21@22(Qb",
						   "1Bi@1%2s5&E(", "4g2GO$33m@@&", "+b1G[2}2b5%C", "}v5)T1@b*C32", "|b11Bg@2^%3C",
						   "xC3%)f~f4724D#)3T~F5", "%13G2^@_2B3f%C9;bgF-", "Bit133^GG#12|1^%6dB^",
						   "B]4D@Kff#1@2#@3<D2h1", "%EF1i22$1&22cE%I>@%2", "5b&12L6JJ@1g2*@^(3H*",
						   ".4|dP22g)C461c)@c^1D", "2@E9C#@131K1&F(@ckh1", "D2%2%1g2F*2*5`Cc3)jQ",
						   "Bssc14v6$1]1$}4#~I_F"];

		function run(password) {
			it("Should allow strong passwords", (done) => {
				const User = {
					"username": "username",
					"email": "example@example.com",
					"password": password,
					"password2": password
				};
				chai.request(BASE_URL)
					.post(REGISTER_URL+"?test=true")
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;
						body.should.be.an("object");

						body.should.have.a.property("success")
							.which.equals(true);

						body.should.not.have.a.property("errors");
						done( );
					});
			});
		}
		passwords.forEach(function(password) {
			run(password);
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		const not_matching_passwords = [
			{ "pass1": "Th1s_Doesnt_M4TCH", "pass2": "This_does_not_M4TCH" },
			{ "pass1": "____$!@#$Aa1", "pass2": "Str0ng_P4SSWORD"},
			{ "pass1": "p4bLO_is_my_W41FU", "pass2": ""}
		];

		function run(passwords) {
			it("Should reject passwords that do not match", (done) => {
				const User = {
					"username": "username",
					"email": "email@example.com",
					"password": passwords.pass1,
					"password2": passwords.pass2
				}
				chai.request(BASE_URL)
					.post(REGISTER_URL+"?test=true")
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;

						body.should.be.an("object")
							.which.has.a.property("success")
							.that.equals(false);

						body.should.have.a.property("errType")
							.which.equals("invalid_data");

						body.should.have.a.property("errors")
							.which.is.an("array");

						body.errors.length.should.equal(1);
						body.errors[0].should.have.a.property("param")
							.which.is.a("string")
							.and.equals("password");

						body.errors[0].should.have.a.property("msg")
							.which.is.a("string")
							.and.equals("Passwords must match");

						done( );

				});
			});
		}
		not_matching_passwords.forEach(function(password) {
			run(password);
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		it("Should allow matching passwords", (done) => {
			const User = {
				"username": "username",
				"email": "example@example.com",
				"password": "Th1s_is_a_Str0NG_password",
				"password2": "Th1s_is_a_Str0NG_password"
			};
			chai.request(BASE_URL)
				.post(REGISTER_URL+"?test=true")
				.send(User)
				.end((err, res) => {
					res.should.have.status(200);
					const body = res.body;
					body.should.be.an("object");
					
					body.should.have.a.property("success")
						.which.equals(true);
					body.should.not.have.a.property("errors");
				
					done( );
				});
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		function run(User) {
			it("Should add valid users", (done) => {
				chai.request(BASE_URL)
					.post(REGISTER_URL)
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;

						body.should.be.an("object");

						body.should.have.a.property("success")
							.which.equals(true);

						body.should.not.have.a.property("errors");

						body.should.have.a.property("msg")
							.which.equals("New user created");

						done( );
					});
				});
		}

		Users.forEach(function(User) {
			run(User);
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		function run(User) {
			it("Should reject duplicate users", (done) => {
				chai.request(BASE_URL)
					.post(REGISTER_URL)
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;

						body.should.be.an("object");

						body.should.have.a.property("success")
							.which.equals(false);

						body.should.have.a.property("errType")
							.which.equals("not_unique")

						done( );
					});
			});
		}

		Users.forEach(function(User) {
			run(User);
		});
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		const Users = [{
			"username": "TristanRice",
			"email": "random@example.com",
			"password": "TH1S_IS_A_STROng_password",
			"password2": "TH1S_IS_A_STROng_password"
		},
		{
			"username": "DisplacerBeas",
			"email": "random@example.net",
			"password": "TH1S_IS_A_STROng_password",
			"password2": "TH1S_IS_A_STROng_password"
		},
		{
			"username": "minor2468",
			"email": "random@example.org",
			"password": "TH1S_IS_A_STROng_password",
			"password2": "TH1S_IS_A_STROng_password"
		}];

		function run(User) {
			it("Should reject users that have entered a username which is already registered", (done) => {
				chai.request(BASE_URL)
					.post(REGISTER_URL)
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;

						body.should.be.an("object");

						body.should.have.a.property("success")
							.which.equals(false);

						body.should.have.a.property("errType")
							.which.equals("not_unique");

						body.should.have.a.property("errors")
							.which.is.an("array");

						body.errors.length.should.equal(1);
						
						body.errors[0].should.have.property("username");
						done( );
					});
			});
		}

		Users.forEach(function(User) {
			run(User);
		})
	});

	describe(`/POST ${REGISTER_URL}`, (done) => {
		const Users = [{
			"username": "randomUser",
			"email": "tristan@colmderis.com",
			"password": "TH1S_IS_A_STROng_password",
			"password2": "TH1S_IS_A_STROng_password"
		},
		{
			"username": "randomUser",
			"email": "minor_2468@hotmail.com",
			"password": "TH1S_IS_A_STROng_password",
			"password2": "TH1S_IS_A_STROng_password"
		},
		{
			"username": "randomUser",
			"email": "minr6750@gmail.com",
			"password": "TH1S_IS_A_STROng_password",
			"password2": "TH1S_IS_A_STROng_password"
		}];

		function run(User) {
			it("Should reject users who enter an email that is already registered", (done) => {
				chai.request(BASE_URL)
					.post(REGISTER_URL)
					.send(User)
					.end((err, res) => {
						res.should.have.status(200);
						const body = res.body;

						body.should.be.an("object");

						body.should.have.a.property("success")
							.which.equals(false);

						body.should.have.a.property("errType")
							.which.equals("not_unique");

						body.should.have.a.property("errors")
							.which.is.an("array");

						body.errors.length.should.equal(1);
						
						body.errors[0].should.have.property("email");
						done( );
					});
			});
		}

		Users.forEach(function(User) {
			run(User);
		});
	});
});