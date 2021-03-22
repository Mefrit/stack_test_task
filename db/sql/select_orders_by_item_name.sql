IF OBJECT_ID (N'select_orders_by_item_name', N'IF') IS NOT NULL  
    DROP FUNCTION select_orders_by_item_name;  
GO  
CREATE FUNCTION select_orders_by_item_name (@name varchar(100))  
RETURNS TABLE  
AS  
RETURN   
(  
	select items.order_id, Customers.name as customer, COUNT(items.order_id) as items_count 
	from OrderItems as items 
	join Orders on Orders.row_id = items.order_id
	join Customers on Orders.customer_id = Customers.row_id
	where items.name=@name group by items.order_id,Customers.name

);  