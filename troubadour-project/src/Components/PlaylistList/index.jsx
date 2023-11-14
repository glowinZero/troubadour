function PlaylistList(sections){ 
    return(
        <div>
            <h1>Hi</h1>
            {sections.map((section)=>{
                return(
                    <div key={section.id}>
                        {section.title}
                    </div>
                )
            })}

        </div>
    )
}

export default PlaylistList