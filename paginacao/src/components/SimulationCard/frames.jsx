import "./index.css"


const Frame = ({ numero, pagina, estado }) => {
    return (
        <div className={`frame ${estado}`}>
            <span className="frame-number">
                Frame {numero}
            </span>
            <span className="frame-page">
                {pagina ?? "-"}
            </span>
        </div>
    )   
}

export default Frame;