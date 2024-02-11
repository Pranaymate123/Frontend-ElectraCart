import Base from "../components/Base";

function Services(){
    return(
        <>
        <Base 
        title="Services we Provide"
        description="In this page we will discuss about the cervices that we provide"
        buttonEnabled={true}
        buttonLink="/"
        buttonType="warning"
        buttonText="Home"
        >
        <h1>This is Services Page</h1>
        </Base>
        </>
    )
}

export default Services;