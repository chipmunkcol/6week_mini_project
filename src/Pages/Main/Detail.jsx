import { useParams } from 'react-router-dom'


function Detail() {

const params = useParams().id
console.log(params)

    return(
        <h1>디테일페이지 입니다!</h1>
    );
}

export default Detail;