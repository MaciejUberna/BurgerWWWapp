import {useState, useEffect} from 'react';

export default HttpClient => {
    const [error, setError] = useState(null);

    const reqInterceptor = HttpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const resInterceptor = HttpClient.interceptors.response.use(response => response, err => {
        setError(err);
    });

    const req = HttpClient.interceptors.request;
    const res = HttpClient.interceptors.response;

    //Prevents memory licks when component is not needed anymore
    useEffect(() => {
        return () => {
            req.eject(reqInterceptor);
            res.eject(resInterceptor);
        };
    },[req,res,reqInterceptor,resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler]
};