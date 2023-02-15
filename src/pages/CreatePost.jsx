import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { FormField, Loader } from '../components';
import {preview} from '../assets'
import { getRandomPrompt } from '../utils';


const CreatePost = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        prompt: '',
        photo: ''
    });
    const [generatingImg, setGeneratingImg] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(form.name && form.prompt && form.photo){
            setLoading(true)
            try {
                const url = 'https://api-dall-e-20-production.up.railway.app/api/posts';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...form})
                })
                await response.json()
                navigate('/')
            } catch (error) {
                alert(error);
            }
            finally{
                setLoading(false)
            }
        }else{
            alert('Todos los campos son obligatorios')
        }
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt);
        setForm({...form, prompt: randomPrompt})
    }

    const generateImage = async () => {
        if(form.prompt){
            try {
                setGeneratingImg(true)
                const url = 'https://api-dall-e-20-production.up.railway.app/api/dalle';
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({prompt: form.prompt})
                });
                const data = await response.json();
                setForm({...form, photo: `data:image/jpeg;base64,${data.photo}`})
            } catch (error) {
                alert(error);
            }finally{
                setGeneratingImg(false)
            }
        }
    }

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h2 className='font-extrabold text-textColor text-[32px]'>Create</h2>
                <p className='text-[#666e75] text-[14px] max-w-[500px] mt-2'>Create imaginative and visually stunning images through DALL-E AI and share them with the community.</p>
            </div>
            <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-5'>
                    <FormField 
                        labelName='Your name.'
                        type="text"
                        name="name"
                        placeholder='Enter your name'
                        value={form.name}
                        handleChange={handleChange}
                    />
                    <FormField 
                        labelName='Prompt'
                        type="text"
                        name="prompt"
                        placeholder='a stained glass window depicting a hamburger and french fries'
                        value={form.prompt}
                        handleChange={handleChange}
                        isSurpriseMe={true}
                        handleSurpriseMe={handleSurpriseMe}
                    />

                    <div className='relative w-64 h-64 p-3 rounded-lg bg-gray-50 border-gray-300 text-gray-900 flex justify-center items-center focus:ring-blue-500 focus:border-blue-500'>
                        {form.photo ? (
                            <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain rounded-lg'/>
                        ) : (
                            <img  src={preview} alt="preview" className='w-9/12 h-9/12 object-contain opacity-40'/>
                        )}

                        {generatingImg && (
                            <div className='w-full h-full flex justify-center items-center absolute bg-black bg-opacity-80 rounded-lg'> 
                                <Loader />
                            </div>
                        )}
                    </div>

                    <div className='mt-5 flex gap-5'>
                        <button
                            type='button'
                            onClick={generateImage}
                            className='text-white bg-green-700 font-medium rounded-md text-sm text-center px-5 py-2.5 w-full sm:w-auto'
                        >
                            {generatingImg ? 'Generating...' : 'Generate'}
                        </button>
                    </div>

                    <div className='mt-5'>
                        <p className='text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it with others in the community.</p>
                        <button
                            type='submit'
                            className='mt-3 text-white text-sm text-center bg-[#6469ff] rounded-md font-semibold w-full sm:w-auto px-5 py-2.5'
                        >
                            {loading ? 'Sharing...' : 'Share with the community'}
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}

export default CreatePost