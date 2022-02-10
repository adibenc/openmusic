const ClientError = require('../../exceptions/ClientError');
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

    success(h, msg, data){
        return this.baseJson(h, 200, "success", msg, data)
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

            return this.success(h, "Data Dibuat!", data);
        } catch (error) {
            if (error instanceof ClientError) {
                return this.validationFail(h, error.statusCode, error.message, null)
            }
        
            // Server ERROR!
            console.error(error);
            return this.commonServerFail(h);
        }
    }

    all(req, h, ctx){
        try {
            const { id } = req.params;
    
            let data = {
                id:1
            }
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
    
    single(req, h, ctx){
        try {
            const { id } = req.params;
    
            let data = {
                id:1
            }
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
    
    update(req, h, ctx){
        try {
            const { id } = req.params;
    
            let data = {
                id:1
            }
            return ctx.success(h, "Updated!", data);
        } catch (error) {
            if (error instanceof ClientError) {
                return ctx.validationFail(h, error.statusCode, error.message, null)
            }
      
            // Server ERROR!
            console.error(error);
            return ctx.commonServerFail(h);
        }
    }
    
    delete(req, h, ctx){
        try {
            const { id } = req.params;
    
            let data = {
                id:1
            }
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