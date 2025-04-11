import { useState, useEffect } from 'react'
import axios from 'axios'

function useAxios(url, method = "GET", body = null){
    const [data, setData] = useState(null) // Dữ liệu trả về từ API
    const [isLoading, setIsLoading] = useState(true) // Trạng thái loading

    useEffect(() => {
        const fetchData = async() =>{
            try{
                setIsLoading(true) // Đang tải dữ liệu
                const res = await axios({
                    method,
                    url,
                    data: body, // Các phương thức GET, POST, PUT, DELETE,...   
                })
                setData(res.data) // Cập nhật dữ liệu
            }catch (err){
                console.log(err)
            }
            finally{
                setIsLoading(false) // Đã lấy dữ liệu thành công!
            }
        }

        // Chỉ gọi API khi URL và method thay đổi
        fetchData()
    }, [url, method, body])

    return { data, isLoading }
}

export default useAxios