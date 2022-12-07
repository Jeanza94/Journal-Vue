import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";
import setimmediate from 'setimmediate'
import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: 'dfpe1hyer',
    api_key: '418377844995562',
    api_secret: '_abfP4U-kpRT1cKAELGzjjEuDNY',
})


describe('Pruebas en la función uploadImage', () => { 

    test('debe de cargar un archivo y retornal el url', async() => { 

        jest.setTimeout(10000)
        const { data } = await axios.get('https://res.cloudinary.com/dfpe1hyer/image/upload/v1660829188/cld-sample-5.jpg',{
            responseType: 'arraybuffer'
        })

        const file = new File([ data ], 'foto.jpg')
        
        const url = await uploadImage(file)
        expect(typeof url).toBe('string')

        const arr = url.split('/');
        const id = arr[arr.length - 1].split('.')[0]
        
        cloudinary.v2.api.delete_resources(`journalvue/${id}`)

    });

});