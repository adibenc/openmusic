class BaseHandler{
    constructor(){

    }

    baseJson(h, code, status, msg, data){
        if(!status){
            status = "success"
        }
        h.response({
            status: status,
            message: msg,
            data: data,
        })
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
              const response = validationFail(h, error.statusCode, error.message, {})
              
              return response;
            }
      
            // Server ERROR!
            const response = this.commonServerFail(h)
            console.error(error);
            return response;
          }
    }
}