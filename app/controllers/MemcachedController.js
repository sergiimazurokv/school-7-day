"use strict";

module.exports = {

    /**
     * Достает из memcached данные по указанному ключу
     *
     * @example curl -v -X GET "http://127.0.0.1:8081/memcached/bar"
     * @param next
     * +
     */
    getAction: function * (next){
        try {
            if (yield this.memcached.has(this.params.key)) {
                this.body = {
                    value: yield this.memcached.get(this.params.key)
                };
                this.status = 200;
            } else {
                this.status = 404;
                this.body = {message: 'key not found or invalid'};
            }
        } catch (e) {
            this.status = 400;
            this.body = {message: 'Bad Request'}
        }

        yield next;
    },

    /**
     * @todo Описать метод PUT /memcached/:key {"value":"baz","expires":90}, чтобы он менял данные в memcached по указанному ключу
     * @example curl -v -X PUT "http://127.0.0.1:8081/memcached/bar" -d '{"value":"foo","expires":60}' -H "Content-Type: application/json"

     * @param next
     */
    putAction: function * (next){
        try {
            if (yield this.memcached.has(this.params.key)) {
                if (this.request.body.value !== undefined && this.request.body.expires !== undefined) {
                    yield this.memcached.set(this.params.key, this.request.body.value, this.request.body.expires);
                    this.status = 200;
                    this.body = {message: 'ok'}
                } else {
                    this.status = 204;
                    this.body = {message: 'no content'}
                }
            } else {
                this.status = 404;
                this.body = {message: 'key not found or invalid'};
            }
        } catch (e){
            this.status = 400;
            this.body = {message: 'Bad Request'};
        }

        yield next;
    },

    /**
     * Устанаваливает значение заданному ключу
     *
     * @example curl -v -X POST "http://127.0.0.1:8081/memcached" -d '{"key":"bar","value":"foo","expires":60}' -H "Content-Type: application/json"
     * @param next
     */
    postAction: function * (next){
        try{
            yield this.memcached.set(this.request.body.key, this.request.body.value, this.request.body.expires);
            this.status = 201;
            this.body = this.request.body;
        }catch(e){
            this.status = 400;
            this.body = {message: "Bad Request"};
        }

        yield next;
    },

    /**
     *
     * @todo Описать метод DELETE /memcached/:key который удалял бы по ключу из memcached. Использовать другие методы преобразования функций для работы с memcached
     * @example curl -v -X DELETE "http://127.0.0.1:8081/memcached/bar"
     * @param next
     * +
     */
    deleteAction: function * (next){
        try {
            if (yield this.memcached.has(this.params.key)) {
                yield this.memcached.del(this.params.key);
                this.status = 200;
                this.body = {message: 'ok'}
            } else {
                this.status = 404;
                this.body = {message: 'key not found or invalid'};
            }
        } catch (e){
            this.status = 400;
            this.body = {message: 'Bad Request'};
        }

        yield next;
    }
};