def goodPoint(arr)
	arrSize = arr.size
	tempArr = Array.new(arrSize-1)
	tempArr.each_index do |ind|
		tempArr[ind] = arr[ind+1] - arr[ind]
	end
	maxNumber = 0
	tempMaxNumber = 0
	flag = 0 
	(0..arrSize-2).each do |i|
		if tempArr[i]+tempMaxNumber > maxNumber
			tempMaxNumber += tempArr[i]
			maxNumber = tempMaxNumber
			if flag == 0
				flag = i
			end
		elsif tempArr[i]+tempMaxNumber > 0
			tempMaxNumber += tempArr[i]
		else
			tempMaxNumber = 0
			flag = 0 
		end
	end
	puts "Buy the stock at $#{arr[flag]}\nand then sell it at $#{(maxNumber+arr[flag])}\nfor a profit of $#{maxNumber}" 
end


stock_prices_yesterday1 = [5, 6, 4, 7, 9, 8, 8]
stock_prices_yesterday2 = [5, 6, 12, 7, 8, 4, 9,8]

goodPoint(stock_prices_yesterday1)
goodPoint(stock_prices_yesterday2)