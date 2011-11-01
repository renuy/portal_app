module ApplicationHelper
  def title
    base_title = "Strata Retail - Just Books Community Library Chain"
    if @title.nil?
      base_title
    else
      "#{base_title} | #{@title}"
    end
  end

  def image_url(titleId)
    if titleId then
      title = Title.find_all_by_id(titleId)
      if title.blank? or title[0].username.nil? or title[0].username.blank? or !title[0].username.eql?('AMS')
        "http://justbooksclc.com/images#{titleId/10000}/titles#{titleId/10000}/#{titleId}.jpg"
      else
        "http://img.justbooksclc.com.s3.amazonaws.com/#{title[0].isbn}.jpg"
      end
    else
      "#"
    end
  end

  def default_image_url
    "http://justbooksclc.com/images/noimage.jpg"
  end

end
