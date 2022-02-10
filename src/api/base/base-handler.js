const { DatabaseError } = require('pg-protocol');
const ClientError = require('../../exceptions/ClientError');
const NotFoundError = require('../../exceptions/NotFoundError');
const cl = console.log

class BaseHandler{
    service = null
    schema = null
    validator = null

    constructor(service, schema, validator){
        this.service = service;
        this.schema = schema;
        this.validator = validator;
    }

    setService(service){
        this.service = service

        return this
    }

    getService(){
        return this.service
    }

    baseBind(){
        this.baseJson = this.baseJson.bind(this);
        this.success = this.success.bind(this);
        this.userFail = this.userFail.bind(this);
        this.validationFail = this.validationFail.bind(this);
        this.serverFail = this.serverFail.bind(this);
        this.commonServerFail = this.commonServerFail.bind(this);

        this.post = this.post.bind(this);
        this.single = this.single.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    baseJson(h, code=200, status="success", msg="-", data = null){
        let json = {
            status: status,
            message: msg,
        }
        
        if(data){
            json.data = data
        }

        const response = h.response(json)

        response.code(code)

        return response
    }

    success(h, msg, data, code=200){
        return this.baseJson(h, code, "success", msg, data)
    }

    userFail(h, msg, data){
        return this.baseJson(h, 400, null, msg, data)
    }

    validationFail(h, code, msg, data){
        return this.baseJson(h, code, "fail", msg, data)
    }
    
    serverFail(h, msg, data){
        return this.baseJson(h, 500, 'fail', msg, data)
    }

    commonServerFail(h){
        return this.baseJson(h, 500, 'error', 'Maaf, terjadi kegagalan pada server kami.', null)
    }

    post(req, h, ctx){
        try {
            this.validator.validate(this.schema, req.payload)
            
            let data = this.service.create(req.payload)

            return this.success(h, "Data Dibuat!", data, 201);
        } catch (error) {
            if (error instanceof ClientError) {
                return this.validationFail(h, error.statusCode, error.message, null)
            }
        
            // Server ERROR!
            console.error(error);
            return this.commonServerFail(h);
        }
    }

    async all(req, h, ctx){
        try {
            let data = this.service.all()

            return ctx.success(h, "Success get all!", data);
        } catch (error) {
            if (error instanceof ClientError) {
                return ctx.validationFail(h, error.statusCode, error.message, null)
            }
        
            // Server ERROR!
            console.error(error);
            return ctx.commonServerFail(h);
        }
    }
    
    async single(req, h, ctx){
        try {
            const { id } = req.params;
            let data = await this.service.single(id)

            return this.success(h, "Success!", data);
        } catch (error) {
            if (error instanceof ClientError) {
                return this.validationFail(h, error.statusCode, error.message, null)
            }
        
            // Server ERROR!
            console.error(error);
            return this.commonServerFail(h);
        }
    }
    
    async update(req, h, ctx){
        try {
            const { id } = req.params;
            this.validator.validate(this.schema, req.payload)
            
            let data = await this.service.update(id, req.payload)

            return ctx.success(h, "Updated!", data);
        } catch (error) {
            if (error instanceof ClientError || error instanceof NotFoundError) {
                return ctx.validationFail(h, error.statusCode, error.message, null)
            }

            if(error instanceof DatabaseError ){
                return ctx.validationFail(h, error.statusCode, error.message, null)
            }
      
            // Server ERROR!
            console.error(error);
            return ctx.commonServerFail(h);
        }
    }
    
    async delete(req, h, ctx){
        try {
            const { id } = req.params;
            let data = this.service.delete(id)

            return ctx.success(h, "Deleted!", data);
        } catch (error) {
            if (error instanceof ClientError) {
                return ctx.validationFail(h, error.statusCode, error.message, null)
            }
        
            // Server ERROR!
            console.error(error);
            return ctx.commonServerFail(h);
        }
    }
}

module.exports = BaseHandler;