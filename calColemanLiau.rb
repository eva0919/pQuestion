def calColemanLiau(block_text) 
	# Don't know if \n can decide sentence or using .
	# Using my own way to avoid those situation
	sentenceNumber = getSentenceNumber( block_text )
	words = getWords(block_text)
	wordsSize = words.size
	letterNumber = 0 
	words.each do |w|
		letterNumber += w.gsub(/\W/,"").size
	end
	perWordsNumber = wordsSize / 100
	cli = 0.0588 * ( letterNumber/perWordsNumber ) - 0.296 * (sentenceNumber/perWordsNumber) - 15.8
	puts "The CLI of block_text is #{cli}"
end

def getSentenceNumber(block_text)
	return extractSentence(block_text).size
end

def getWords(block_text)
	return block_text.gsub("\n", " ").split(" ")
end

def extractSentence(content)
	content = content.gsub("\n", " ")
	content = content.split(/[.?!]/)
	newContent = []
	isContinue = false
	maybeContinue = false
	maybeContinueDigit = false
	content.reverse.each do |line|
		token = line.split(" ")
		if newContent.size > 0  #起始狀態
			if token.size < 3
				newContent[newContent.length - 1] = line + "."+  newContent.last 
				isContinue = true
			elsif isContinue
				newContent[newContent.length - 1] = line + "."+  newContent.last 
				isContinue = false
			# elsif maybeContinue
			# 	unless token.first =~ /[A-z]/
			# 		newContent[newContent.length - 1] = line + "."+  newContent.last 
			# 	else
			# 		newContent << line
			# 	end
			# 	maybeContinue = false
			elsif token.last =~ /[A-Z]/
				if newContent[newContent.length - 1][0] =~ /[a-z]/ || newContent[newContent.length - 1].downcase.index("com") == 0
					newContent[newContent.length - 1] = line + "."+  newContent.last 
				else
					newContent << line +"."
				end
			# elsif maybeContinueDigit
			# 	if token.first[0] =~ /[0-9]/
			# 		newContent[newContent.length - 1] = line + "."+  newContent.last 
			# 	else
			# 		newContent << line
			# 	end
			# 	maybeContinueDigit = false		
			
			elsif token.last[token.last.length-1] =~ /[0-9]/
				if newContent[newContent.length - 1][0] =~ /[0-9]/
					newContent[newContent.length - 1] = line + "."+  newContent.last 
				else
					newContent << line +"."
				end
			else
				newContent << line +"."
			end
		else
			newContent << line +"."
		end
	end


end

