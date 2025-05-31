import axios from "axios";

export const getHeaders = (extraHeaders = {}) => ({
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        ...extraHeaders
    }
});

export const postConvocatoria = (formData: Object) => {
    axios
        .post("http://localhost:3000/convocatoria", formData, 
            getHeaders({"Content-Type": "multipart/form-data"}))
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.error(error);
        });
};

export const getConvocatorias = async () => {
    const response = await axios.get("http://localhost:3000/convocatoria", getHeaders());
    return response.data;
};

export const getConvocatoriaById = async (id: string) => {
    const response = await axios.get(`http://localhost:3000/convocatoria/${id}`, getHeaders());
    return response.data;
};


export const putConvocatoria = async (id: string, edicionDeConvocatoria: FormData) => {
    const response = await axios
        .put(`http://localhost:3000/convocatoria/${id}`, edicionDeConvocatoria, 
            getHeaders({"Content-Type": "multipart/form-data"}))
        .then(function(response){
            console.log(response)
        })
}

export const deleteConvocatoria = async (id: string): Promise<void> => {
    try {
        await axios.delete(`http://localhost:3000/convocatoria/${id}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` }
        });
        console.log("Convocatoria eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar la convocatoria", error);
        throw error;
    }
};