const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server')
const { Todo } = require('./../models/todo')

beforeEach((done) => {
    Todo.remove({}).then(() => done());
})

describe('POST /todos', () => {
    it('Should create a new Todo', (done) => {
        var text = 'Test todo Text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    // expect(todo).toInclude({
                    //     text:'Test todo Text'
                    // })
                    done();
                }).catch((e) => {
                    return done(e);
                })
            })
    });

    it('Should not create todo with invalid body data', (done) => {
        var tobj = {
            text: ''
        }
        request(app)
            .post('/todos')
            .send(tobj)
            .expect(400)
            .end((err, res) => {
                if (err) { return done(err); }
            })

        Todo.find().then((todo) => {
            expect(todo.length).toBe(0)
            done();
        }).catch((e) => done(e))
    })

})