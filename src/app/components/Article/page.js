import React from 'react'
import { collection,getDocs } from 'firebase/firestore'
import { db } from '@/app/config/Config'


const Article = ({ title, desc, dateval, name, user, publisherId, readMoreOfThis, setReadMoreOfThis,publisherCollection,setPublisherCollection }) => {
    return (
        <div className='w-[60%] ml-[70px] p-5 bg-blue-200 rounded-xl mt-10'>

            <div className='flex w-[50%] flex-col gap-y-2'>
                <div className='h-[70px] w-[70px] bg-black rounded-lg '>

                </div>

                <p className='text-xl font-bold w-[100%] break-all'>{title}</p>
                <div>
                    <span className='text-sm font-bold  '>{dateval}</span>

                </div>

                <div><span className='text-sm font-bold '>{name}</span></div>

            </div>
            <p className='font-light w-[90%] break-all'>
                {desc}
            </p>
            {/* {user ? null : <button className='bg-blue-500 text-white p-3 font-semibold rounded-lg'>Read more of this Publisher</button>} */}
            {publisherId ? <button className='bg-blue-500 text-white p-3 font-semibold rounded-lg'
                onClick={ async() => {
                    setReadMoreOfThis(true)
                    console.log(readMoreOfThis)
                    console.log(publisherId)
                    const colRef = collection(db, `blog${publisherId}`);
                    const docsSnap = await getDocs(colRef);
                    docsSnap.forEach(doc => {
                        console.log(doc.data());
                        let docData = doc.data()
                       
                        
                      
                       
                        publisherCollection.push(docData)
                        setPublisherCollection([...publisherCollection])
                        console.log(publisherCollection)
                    })

                }}
            >Read more of this Publisher</button> : null}
        </div>
    )
}

export default Article