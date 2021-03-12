import React from 'react'

interface Props {

}

const ItemListBill = (props: Props) => {
    return (
        <div className=" border-black border rounded-md">
            <div className="flex-row lg:flex justify-between p-2 mb-4"><p className="text-sm lg:text-base">Ngày 7 Tháng 5 Năm 2020 - 11 Giờ 14 Phút</p>
                <p className="text-sm lg:text-base">Mã HĐ: 5eb38b2c6b296800177a6deb</p>
            </div>
            <div className="flex-row lg:flex justify-between p-2 w-11/12 border-black border mx-auto rounded-sm mb-1">
                <p className="text-sm lg:text-base">Chuột Logitech G403 HERO || Số lượng: 1</p>
                <p className="text-sm lg:text-base">1208800 d</p>
            </div>
            <div className="flex-row lg:flex justify-between p-2 w-11/12 border-black border mx-auto rounded-sm mb-1">
                <p className="text-sm lg:text-base">Người nhận: Đào Nguyên Hà
</p>
                <p className="text-sm lg:text-base">SĐT: 0376214088</p>
            </div>
            <div className="flex-row lg:flex justify-between p-2 w-11/12 border-black border mx-auto rounded-sm mb-1">
                <p className="text-sm lg:text-base">Địa chỉ: ấdgdas, Huyện Quốc Oai, Thành phố Hà Nội
</p>
            </div>
            <div className="flex-row lg:flex justify-between bg-gray-400 border-black border-t rounded-b-md p-2 mt-4"><div>Giá: 67,640,000đ - Phí Ship: 0 đ</div>
                <p className="text-sm lg:text-base">Đang chuẩn bị hàng</p>
                <p className="text-sm lg:text-base">Ship COD</p>
                <p className="text-sm lg:text-base">Chưa thanh toán</p>
            </div>
        </div>
    )
}

export default ItemListBill
