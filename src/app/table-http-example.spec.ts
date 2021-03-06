import { TableHttpExample } from "./table-http-example";


//Kiểm tra giao diện
// 1. Hiển thị khởi tạo màn hình => Các item trên màn hình nằm đúng vị trí và giá trị default so với thiết kế.

//Kiểm tra câu lệnh SQL xem có query đúng với mong muốn của người dùng không
// 2. DB không có data, nhập thông tin gì cũng được=> click nút Search,... => Hiển thị thông báo "No data found"
// 3. DB có data, nhập thông tin Country Name => click nút Search,..không khớp với data trong DB => Hiển thị thông báo "No data found"
// 4. DB có data, select thông tin Country Name đúng => click nút Search,...=>Hiển thị số record có tên Country = giá trị đã chọn

//Kiểm tra hiển thị datagrid và phân trang, ví dụ datagrid chỉ hiển thị tối đa 20 records.
// 5. Search không có data (0 record) => datagrid chỉ hiển thị header và thông báo "No data found"
// 6. Search có => datagrid hiển thị header và 20 dòng và có thể scroll, hoặc click pagination để hiện thị records 21 trở đi

//Kiểm tra hiển thị datagrid và phân trang
// 7. Search không có data (0 record) => datagrid chỉ hiển thị header và thông báo'No data found' button Prev và Next disable
// 9. Search có <=20 records => datagrid hiển thị header và 20 dòng, button Prev và Next disable
// 10. Search có >20 records => datagrid hiển thị header và 20 dòng (record 1 đến 20), button Prev disable và button Next enable
// 11. Datagrid có 30 records, Click button Next => hiển thị từ record thứ 20 đến 30, button Prev chuyển sang enable và button Next disable
// 12. Datagrid có 50 records, Click button Next => hiển thị từ record thứ 20 đến 30, button Prev và button Next chuyển sang enable
// 13. Datagrid có 50 records, Đang ở trang 2, Click button Prev => hiển thị từ record thứ 1 đến 20, button Prev chuyển sang disable và button Next enable.

