import React, { ChangeEvent } from 'react'
import { useTranslation } from "react-i18next";

interface Props {

}

const LangSelection = (props: Props) => {
    const { i18n } = useTranslation()
    return (
        <div>
            <select className="dark:bg-gray-800 bg-gray-100 cursor-pointer" name="" id="" value={i18n.language}
                onChange={(e) => {
                    i18n.changeLanguage(e.target.value);
                }}>
                <option value="vi">VN</option>
                <option value="en">EN</option>
            </select>
        </div>
    )
}

export default LangSelection
