 select * from select_orders_by_item_name('Кассовый аппарат')
  select * from select_orders_by_item_name(N'Факс')
  select * from select_orders_by_item_name(N'Стулья')

  select * from calculate_total_price_for_orders_group(3)
  select * from calculate_total_price_for_orders_group(1)
  select * from calculate_total_price_for_orders_group(12)
  select * from calculate_total_price_for_orders_group(2)