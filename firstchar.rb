def firstchar(text)
	return text.split(" ").map{ |c| c[0] }.reduce(:+)
end

firstchar(“what you see is what you get”)