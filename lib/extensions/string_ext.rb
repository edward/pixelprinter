class String
  # used in liquid filters
  def to_handle
    result = ActiveSupport::Inflector.transliterate(self)
                                                                                                                           
    result.downcase!
    
    # remove apostrophes, parentheses, and brackets
    result.gsub!(/[\'\"\(\)\[\]]/, '')

    # strip all non-word chars
    result.gsub!(/\W/, ' ')

    # replace all whitespace sections with a dash
    result.gsub!(/\ +/, '-')

    # trim dashes
    result.gsub!(/(-+)$/, '')
    result.gsub!(/^(-+)/, '')
    
    result
  end
end