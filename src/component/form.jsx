const Form = () => {

    return(
        <div className="form_wrapper">
            <div className="container">
                <div className="form_section">
                    <form>
                        <div className="form_grid">

                            {/* first name */}
                            <div className="inputfield">
                                <input type="text" placeholder="Enter your first name"/>
                                <label for="">first name</label>
                            </div>

                             {/* last name */}
                             <div className="inputfield">
                                <input type="text" placeholder="Enter your last name"/>
                                <label for="">last name</label>
                            </div>

                             {/*email*/}
                            <div className="inputfield">
                                <input type="text" placeholder="Enter your email"/>
                                <label for="">email</label>
                            </div>

                             {/*contact number */}
                             <div className="inputfield">
                                <input type="text" placeholder="Enter your phone number"/>
                                <label for="">phone number</label>
                            </div>

                             {/*website */}
                             <div className="inputfield">
                                <input type="text" placeholder="Enter your website"/>
                                <label for="">your website</label>
                            </div>

                            {/*birthdate */}
                            <div className="inputfield">
                                <input type="date" />
                                <label for="">birthdate</label>
                            </div>

                             {/*age */}
                            <div className="inputfield">
                                <input type="text" placeholder="enter your age" />
                                <label for="">age</label>
                            </div>

                            {/*skill */}
                            <div className="inputfield">
                                <input type="text" placeholder="enter your skill"/>
                                <label for="">age</label>
                            </div>

                            {/*experience */}
                            <div className="inputfield">
                                <input type="text" placeholder="enter your experience"/>
                                <label for="">experience</label>
                            </div>

                             {/*graduation year */}
                             <div className="inputfield">
                                <input type="text" placeholder="enter your graduation year"/>
                                <label for="">graduation year</label>
                            </div>

                             {/*accomplishment*/}
                             <div className="inputfield">
                                <input type="text" placeholder="enter your accomplishment"/>
                                <label for="">graduation year</label>
                            </div>

                             {/*accomplishment*/}
                             <div className="inputfield">
                                <input type="text" placeholder="enter your accomplishment"/>
                                <label for="">graduation year</label>
                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Form;