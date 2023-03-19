// import React, { useState } from 'react';
// import axios from 'axios';

// function ShortenUrl() {
//     const [url, setUrl] = useState('');
//     const [ogImage, setOgImage] = useState(null);
//     const formData = new FormData();
//     formData.append("url", url);
//     formData.append("ogImage", ogImage);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Send the request to the server
//         try {
//             console.log("Called")
//             const response = await axios.post(`http://localhost:5000/shorten-url`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 }
//             });
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setOgImage(file);
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     URL:
//                     <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
//                 </label>
//                 <br />
//                 <label>
//                     Open Graph image:
//                     <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
//                 </label>
//                 <br />
//                 <button type="submit">Shorten URL</button>
//             </form>
//         </div>
//     );
// }

// export default ShortenUrl;


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import baseURL from 'src/app/common/baseURL';

function ShortenUrl() {
    const [ogImageUrl, setOgImageUrl] = useState('');
    // const [html, sethtml] = useState("")
    const [loading, setLoading] = useState(true)
    const [name, setname] = useState("")
    const params = useParams();
    const id = params.id
    useEffect(() => {
        axios.get(`${baseURL}/${id}`)
            .then(response => {
                console.log(response)
                setOgImageUrl(response.data.ogImageUrl);
                setname(response.data.name)
                window.location.replace(response.data.originalUrl);
                //sethtml(response.data.html)
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.id]);
    if (loading) {
        return (
            <div className="flex items-center bg-[#fff] justify-center h-[1000px] w-full">
                <div >
                    <Helmet>
                        <title>{name}</title>
                        <meta property="og:url" content={ogImageUrl} />
                        <meta property="og:image" content={ogImageUrl} />
                        <meta property="og:description" content="Powered by Kleanify Preview Link" />
                    </Helmet>
                </div>
            </div>
        );
    }
}
export default ShortenUrl;