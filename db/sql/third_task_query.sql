SELECT
  Customers.name
FROM
  Orders AS Orders1
JOIN OrderItems AS Items ON Items.order_id = Orders1.row_id 
JOIN Customers ON Customers.row_id = Orders1.customer_id 
WHERE
	Orders1.registered_at BETWEEN '2019-12-31' AND '2021-01-01'  AND 
	'Кассовый аппарат' IN (SELECT name FROM OrderItems WHERE order_id =  Orders1.row_id)  AND
	Orders1.customer_id NOT IN (
		SELECT
		  Orders3.customer_id
		FROM
		  Orders AS Orders3
		JOIN OrderItems AS Items1 ON Items1.order_id = Orders3.row_id 
		WHERE
			Orders3.registered_at BETWEEN '2019-12-31' AND '2021-01-01'  AND
		   'Кассовый аппарат' NOT IN (SELECT name FROM OrderItems WHERE order_id =  Orders3.row_id)  GROUP BY Orders3.customer_id
   ) GROUP BY Customers.name