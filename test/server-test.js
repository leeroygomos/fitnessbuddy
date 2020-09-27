// to test login POST

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index.js');
const request = require('supertest');
var should = chai.should();

chai.use(chaiHttp);

describe("TDEE", function() {
	it("Should display computed TDEE on /tdee GET", function(done) {
		chai.request(server)
			.get('/tdee')
			.send({weight:10, height:10.7, age:1, gender:'female', activity: 'Lightly Active'})
			.end(function(err, res){
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.have.property('data');
				res.body.data.should.equal(1);
				done();
			});
	});

	it("Should list ALL users on /display GET", function(){
		chai.request(server)
			.get('/display')
			.end(function(err,res){
				res.should.have.status(200);
				res.body[0].should.have.property('username');
				res.body[0].should.have.property('password');
				res.body[0].should.have.property('name');
				res.body[0].should.have.property('weight');
				res.body[0].should.have.property('dob');
				res.body[0].should.have.property('gender');
				res.body[0].should.have.property('activity');
				res.body[0].should.have.property('exp');
				res.body[0].should.have.property('goal');
				res.body[0].should.have.property('bench');
				res.body[0].should.have.property('deadlift');
				res.body[0].should.have.property('squat');
				res.body[0].should.have.property('total_calories');
				res.body[0].should.have.property('fats');
				res.body[0].should.have.property('carbs');
				res.body[0].should.have.property('protein');
			});
	});

	it("Should list ALL trainers", function(){
		chai.request(server)
		.post('/trainers')
		.end(function(err,res){
			res.should.have.status(200);
			res.body[0].should.have.property('username');
			res.body[0].should.have.property('password');
			res.body[0].should.have.property('name');
			es.body[0].should.have.property('experience');
			es.body[0].should.have.property('company');
			es.body[0].should.have.property('phone');
			es.body[0].should.have.property('email');
			es.body[0].should.have.property('dob');
			es.body[0].should.have.property('gender');
		});
	});

	it("Should list ALL trainers for admin database page", function(){
		chai.request(server)
		.post('/trainerDatabase')
		.end(function(err,res){
			res.should.have.status(200);
			res.body[0].should.have.property('username');
			res.body[0].should.have.property('password');
			res.body[0].should.have.property('name');
			es.body[0].should.have.property('experience');
			es.body[0].should.have.property('company');
			es.body[0].should.have.property('phone');
			es.body[0].should.have.property('email');
			es.body[0].should.have.property('dob');
			es.body[0].should.have.property('gender');
		});
	});

	it("Should list all user's name,exp,gender", function(){
		chai.request(server)
		.post('/ranking')
		.end(function(err,res){
			res.should.have.status(200);
			res.body[0].should.have.property('gender');
			res.body[0].should.have.property('name');
			res.body[0].shemould.have.property('exp');
			expect(body).to.not.have.property('password');
		});
	});

	it("Should list all user's name,exp of only females.", function(){
		chai.request(server)
		.post('/femalerank')
		.end(function(err,res){
			res.should.have.status(200);
			res.body[0].gender.to.equal('female');
			res.body[0].should.have.property('name');
			res.body[0].should.have.property('exp');
			expect(body).to.not.have.property('password');
		});
	});

	it("Should list all user's name,exp of only males.", function(){
		chai.request(server)
		.post('/malerank')
		.end(function(err,res){
			res.should.have.status(200);
			res.body[0].gender.to.equal('male');
			res.body[0].should.have.property('name');
			res.body[0].should.have.property('exp');
			expect(body).to.not.have.property('password');
		});
	});

	it("Testing trainer sign up!", function(){
		chai.request(server)
		.post('/trainer_signup')
		.send({ username:'testTrain', password:'test', name:'test', experience:1,
				company:'self-employed', phone:'123456789', email:'test@gmail.com',
				dob: '1998-02-02', gender: 'male'})
		.end(function(err,res){
			res.should.have.status(200);
			res.body.should.have.property('name');
			res.body.should.have.property('username');
			res.body.should.have.property('password');
			res.body.should.have.property('experience');
			res.body.should.have.property('company');
			res.body.should.have.property('phone');
			res.body.should.have.property('email');
			res.body.should.have.property('dob');
			res.body.should.have.property('gender');
		});
	});	

	it("Testing trainer delete",function(){
		chai.request(server)
		.delete('/deleteTrainer')
		.send({username:'testTrain'})
		.end(function(err,res){
			res.should.have.status(200);
		});
	});

	it("Testing user signup", function(){
		chai.request(server)
		.post('/signup')
		.send({
			username: 'testUser',
			password:'test',
			name:'test',
			weight: 1,
			height: 1,
			dob: '1998-02-02',
			gender: 'female',
			activity: 'Lightly Active',
			goal:2
		})
	});
});
