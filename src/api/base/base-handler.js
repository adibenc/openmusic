class BaseHandler{
    constructor(){

    }

    baseJson(h, code=200, status="success", msg="-", data = null){
        let json = {
            status: status,
            message: msg,
        }
        
        if(data){
            json.data = data
        }

        h.response(json)

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

    post(req, h){
        try {
            let data = {}
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

    single(req, h){
        try {
            const { id } = request.params;

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

    update(req, h){
        try {
            const { id } = request.params;

            let data = {
                id:1
            }
            return this.success(h, "Updated!", data);
          } catch (error) {
            if (error instanceof ClientError) {
                return this.validationFail(h, error.statusCode, error.message, null)
            }
      
            // Server ERROR!
            console.error(error);
            return this.commonServerFail(h);
          }
    }

    delete(req, h){
        try {
            const { id } = request.params;

            let data = {
                id:1
            }
            return this.success(h, "Deleted!", data);
          } catch (error) {
            if (error instanceof ClientError) {
                return this.validationFail(h, error.statusCode, error.message, null)
            }
      
            // Server ERROR!
            console.error(error);
            return this.commonServerFail(h);
          }
    }
}

module.exports = BaseHandler;